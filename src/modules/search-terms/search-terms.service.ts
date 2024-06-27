import { Injectable } from '@nestjs/common';
import { SearchTerm } from './entities/search-term.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SearchTermsService {
	constructor(@InjectRepository(SearchTerm) private readonly searchTermsRepository: Repository<SearchTerm>) {}

	async createBatch(savedCategories: Category[], categorySearchTermsHM: Record<string, string[]>, userId: number, trainerId: number) {
		const newSearchTerms = savedCategories
			.map((category) => {
				return categorySearchTermsHM[category.name].map((searchTerm) => {
					const newSearchTerm: Partial<SearchTerm> = {
						name: searchTerm.toLowerCase(),
						userId,
						trainerId,
						categoryId: category.id,
					};
					return this.searchTermsRepository.create(newSearchTerm);
				});
			})
			.flat();
		return this.searchTermsRepository.save(newSearchTerms);
	}
}
