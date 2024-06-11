import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesSearchTerms } from './entities/categories-search-terms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesSearchTermsService {
	constructor(@InjectRepository(CategoriesSearchTerms) private readonly categorySearchTermsRepository: Repository<CategoriesSearchTerms>) {}
	async createBatch(categorySearchTerms: { searchTermId: number; categoryId: any }[]) {
		await this.categorySearchTermsRepository.save(categorySearchTerms);
	}
}
