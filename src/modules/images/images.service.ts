import { Injectable } from '@nestjs/common';
import { BingService } from '../providers/bing/bing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import { ImageSourceEnum } from './enums/image-source.enum';
import { TrainersCategoriesImagesService } from './trainers-categories-images/trainers-categories-images.service';

@Injectable()
export class ImagesService {
	constructor(
		private bingService: BingService,
		@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>,
		private trainersCategoriesImagesService: TrainersCategoriesImagesService
	) {}

	async searchImages(trainerId: string, categories: string[], userId: string) {
		// const alreadySearchedImages = await this.imageRepository
		// 	.createQueryBuilder('image')
		// 	.select('image')
		// 	.innerJoin('image.trainersCategoriesImages', 'trainerCategories')
		// 	.where('trainerCategories.trainerId = :trainerId', { trainerId })
		// 	.where({ 'trainerCategories.category': In(categories) })
		// 	.where('image.source = :source', { source: ImageSourceEnum.BING })
		// 	.getMany();
		const categoriesImagesHm = await this.bingService.searchImages(categories);
		const images = Object.entries(categoriesImagesHm).map(([category, imagesUrl]) => {
			return imagesUrl.map((image) => ({
				init_category: category,
				image_url: image.imageUrl,
				thumbnail_url: image.thumbnailUrl,
				source: ImageSourceEnum.BING,
				created_by: userId,
			}));
		});
		const imagesToSave = images.flat();
		const newImages = await this.imageRepository.save(imagesToSave);
		const trainersCategoriesImages = newImages.map((image) => ({
			image_id: image.id,
			trainer_id: trainerId,
			category: image.init_category,
			user_id: userId,
			created_by: userId,
		}));
		return this.trainersCategoriesImagesService.create(trainersCategoriesImages);
	}

	async findAll() {
		return this.imageRepository.find();
	}

	remove(id: number) {
		return `This action removes a #${id} image`;
	}

	async create(createImageDto: Partial<ImageEntity>) {
		return this.imageRepository.save(createImageDto);
	}
}
