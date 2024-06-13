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
		return this.trainerRepository.find({ where: filter });
	}

	async findOne(filter: FindOptionsWhere<TrainerEntity>) {
		return this.trainerRepository.findOne({
			where: filter,
			relations: ['categories', 'categories.categoriesSearchTerms', 'categories.categoriesSearchTerms.searchTerm'],
			loadEagerRelations: true,
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
}
