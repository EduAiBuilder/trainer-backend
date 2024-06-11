import { Injectable } from '@nestjs/common';
import { SearchTermsImages } from './entities/search-terms-images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SearchTermsImagesService {
	constructor(@InjectRepository(SearchTermsImages) private searchTermsImagesRepository: Repository<SearchTermsImages>) {}
	createBatch(searchTermsImages: { searchTermId: number; imageId: any }[]) {
		return this.searchTermsImagesRepository.save(searchTermsImages);
	}
}
