import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainersCategoriesImagesEntity } from './entities/trainers-categories-images.entity';

@Injectable()
export class TrainersCategoriesImagesService {
	constructor(@InjectRepository(TrainersCategoriesImagesEntity) private imageRepository: Repository<TrainersCategoriesImagesEntity>) {}

	async create(createTrainersCategoriesImagesDto: Partial<TrainersCategoriesImagesEntity>[]) {
		return this.imageRepository.save(createTrainersCategoriesImagesDto);
	}
}
