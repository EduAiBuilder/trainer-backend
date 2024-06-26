import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrainerInterface } from './interfaces/trainer.interface';
import { SqsQueuesNamesEnum } from '../../utils/enums/sqs-queues-names.enum';
import { MessageGroupsIdsEnum } from '../../utils/enums/message-groups-ids.enum';
import { SqsService } from '@ssut/nestjs-sqs';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { CategoriesService } from '../categories/categories.service';
import { TrainerCategoriesImagesResponseDto } from './dto/trainer-categories-images-response.dto';

@Injectable()
export class TrainersService {
	constructor(
		@InjectRepository(TrainerEntity) private readonly trainerRepository: Repository<TrainerEntity>,
		private readonly sqsService: SqsService,
		private categoriesService: CategoriesService
	) {}

	async create(createTrainerDto: TrainerInterface) {
		const { categories, ...rest } = createTrainerDto;
		const trainer = await this.trainerRepository.save(rest);
		trainer.categories = await this.categoriesService.createBatch(trainer.id, categories, createTrainerDto.userId);
		await this.sqsService.send(SqsQueuesNamesEnum.SEARCH_IMAGES, {
			body: { trainerId: trainer.id, userId: createTrainerDto.userId },
			id: trainer.id.toString(),
			groupId: MessageGroupsIdsEnum.IMAGES,
		});
		return trainer;
	}

	async findAll(filter: FindOptionsWhere<TrainerEntity> = {}) {
		return this.trainerRepository.find({
			where: filter,
			relations: ['categories', 'categories.searchTerms'],
		});
	}

	async findOne(filter: FindOptionsWhere<TrainerEntity>) {
		return this.trainerRepository.findOne({
			where: filter,
			relations: ['categories', 'categories.searchTerms'],
		});
	}

	async findTrainersUser(filter: FindOptionsWhere<TrainerEntity>) {
		return this.trainerRepository.findOne({
			where: filter,
			select: ['id', 'userId'],
		});
	}

	async update(where: FindOptionsWhere<TrainerEntity>, updateTrainerDto: Partial<TrainerEntity>) {
		return this.trainerRepository.update(where, updateTrainerDto);
	}

	async remove(filter: FindOptionsWhere<TrainerEntity>) {
		if (!filter.id || !filter.userId) {
			throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
		}
		const trainer = await this.trainerRepository.findOne({ where: filter });
		return this.trainerRepository.remove(trainer);
	}

	async getImagesByCategories(trainerId: number, userId: number): Promise<TrainerCategoriesImagesResponseDto[]> {
		const trainersData = await this.trainerRepository.findOne({
			where: { id: trainerId, userId },
			relations: ['categories', 'categories.searchTerms', 'categories.searchTerms.searchTermsImages', 'categories.searchTerms.searchTermsImages.image'],
		});
		return trainersData.categories.flatMap((category) =>
			category.searchTerms.map((searchTerm) => {
				const imageUrls = searchTerm.searchTermsImages.map((searchTermImage) => searchTermImage.image.imageUrl);
				return { category: category.name, imageUrls };
			})
		);
	}

	async validateTrainingReady(trainerId: number, userId: number) {
		const trainer = await this.trainerRepository
			.createQueryBuilder('trainer')
			.leftJoin('trainer.categories', 'category')
			.leftJoin('category.searchTerms', 'searchTerm')
			.leftJoin('searchTerm.searchTermsImages', 'searchTermsImage')
			.where('trainer.id = :trainerId', { trainerId })
			.andWhere('trainer.userId = :userId', { userId })
			.groupBy('trainer.id')
			.addGroupBy('category.id')
			.having('COUNT(searchTermsImage.id) >= 150 AND COUNT(category.id) >= 2')
			.select('trainer.id', 'trainerId')
			.addSelect('COUNT(category.id)', 'categoryCount')
			.getRawOne();

		if (!trainer) {
			throw new HttpException('Trainer is not ready for training', HttpStatus.BAD_REQUEST);
		}
	}

	async sendTrainMessageToQueue(trainerId: number, modelKey: string, modelId: number) {
		await this.sqsService.send(SqsQueuesNamesEnum.TRAIN_MODEL, {
			body: { trainerId, modelKey, modelId },
			id: trainerId.toString(),
			groupId: MessageGroupsIdsEnum.TRAINING,
		});
	}
}
