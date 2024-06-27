import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { SearchTermsService } from '../search-terms/search-terms.service';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
		private readonly searchTermsService: SearchTermsService
	) {}

	async createBatch(trainerId: number, categories: CreateCategoryDto[], userId: number) {
		const categorySearchTermsHM = {};
		const newCategories = categories.map((category) => {
			const { searchTerms, ...rest } = category;
			categorySearchTermsHM[category.name] = searchTerms;
			const newCategory: Partial<Category> = { ...rest, trainerId };
			return this.categoryRepository.create(newCategory);
		});
		const savedCategories = await this.categoryRepository.save(newCategories);
		await this.searchTermsService.createBatch(savedCategories, categorySearchTermsHM, userId, trainerId);
		return savedCategories;
	}
}
