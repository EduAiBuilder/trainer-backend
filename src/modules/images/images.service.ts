import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BingService } from '../providers/bing/bing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import { ImageSourceEnum } from './enums/image-source.enum';
import { TrainerEntity } from '../trainers/entities/trainer.entity';
import { SearchTermsImagesService } from '../search-terms-images/search-terms-images.service';

@Injectable()
export class ImagesService {
	constructor(
		private bingService: BingService,
		@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>,
		private searchTermsImagesService: SearchTermsImagesService
	) {}

	async searchImages(trainer: TrainerEntity, userId: string) {
		const searchTerms = trainer.categories?.flatMap((category) => category?.searchTerms);
		if (!searchTerms?.length) {
			throw new HttpException(`No search terms found for trainer ${trainer.id} and user ${userId}`, HttpStatus.NOT_FOUND);
		}
		const searchTermImages = await this.bingService.searchImages(searchTerms);
		const images = searchTermImages.map(({ searchTermId, images }) => {
			return images.map((image) => {
				const newImage: Partial<ImageEntity> = {
					initSearchTermId: searchTermId,
					imageUrl: image.imageUrl,
					thumbnailUrl: image.thumbnailUrl,
					source: ImageSourceEnum.BING,
					createdBy: userId,
				};
				return this.imageRepository.create(newImage);
			});
		});
		const imagesToSave = images.flat();

		const newImages = await this.imageRepository.save(imagesToSave);
		const searchTermsImages = newImages.map((image) => {
			return {
				imageId: image.id,
				searchTermId: image.initSearchTermId,
			};
		});
		return this.searchTermsImagesService.createBatch(searchTermsImages);
	}

	async findImages(trainerId: number, categories: string[], userId: number, page: number, pageNumbers = 10, isRandomRequired = false) {
		const query = this.imageRepository
			.createQueryBuilder('image')
			.select('image')
			.innerJoin('image.searchTermsImages', 'searchTermsImages')
			.innerJoin('searchTermsImages.searchTerm', 'searchTerm')
			.innerJoin('searchTerm.category', 'category')
			.where('category.trainer_id = :trainerId', { trainerId })
			.andWhere('searchTerm.user_id = :userId', { userId })
			.limit(pageNumbers);

		if (isRandomRequired) {
			query.orderBy('RAND()');
		}

		if (categories?.length) {
			query.andWhere('trainerCategories.category IN (:...categories)', { categories });
		}

		if (page) {
			query.offset(page * pageNumbers);
		}

		return query.getRawMany();
	}

	remove(id: number) {
		return `This action removes a #${id} image`;
	}

	async create(createImageDto: Partial<ImageEntity>) {
		return this.imageRepository.save(createImageDto);
	}
}
