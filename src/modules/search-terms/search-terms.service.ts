import { Injectable } from '@nestjs/common';
import { SearchTerm } from './entities/search-term.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesSearchTermsService } from '../categories-search-terms/categories-search-terms.service';

@Injectable()
export class SearchTermsService {
	constructor(
		@InjectRepository(SearchTerm) private readonly searchTermsRepository: Repository<SearchTerm>,
		private readonly categoriesSearchTermsService: CategoriesSearchTermsService
	) {}

	async createBatch(savedCategories: Category[], categorySearchTermsHM: Record<string, string[]>) {
		const searchTermCategoryIdHM = {};
		const newSearchTerms = savedCategories
			.map((category) => {
				return categorySearchTermsHM[category.name].map((searchTerm) => {
					searchTermCategoryIdHM[searchTerm] = category.id;
					const newSearchTerm: Partial<SearchTerm> = { name: searchTerm };
					return this.searchTermsRepository.create(newSearchTerm);
				});
			})
			.flat();
		const savedSearchTerms = await this.searchTermsRepository.save(newSearchTerms);
		const categorySearchTerms = savedSearchTerms.map((searchTerm) => {
			const categoryId = searchTermCategoryIdHM[searchTerm.name];
			return { categoryId, searchTermId: searchTerm.id };
		});
		await this.categoriesSearchTermsService.createBatch(categorySearchTerms);
	}
}
