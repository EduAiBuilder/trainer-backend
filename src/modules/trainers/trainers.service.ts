import { Injectable } from '@nestjs/common';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './schemas/trainer.schema';
import { FilterQuery, Model } from 'mongoose';
import { TrainerInterface } from './interfaces/trainer.interface';
import { SqsQueuesNamesEnum } from '../../utils/enums/sqs-queues-names.enum';
import { MessageGroupsIdsEnum } from '../../utils/enums/message-groups-ids.enum';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class TrainersService {
	constructor(
		@InjectModel(Trainer.name)
		private trainerModel: Model<Trainer>,
		private readonly sqsService: SqsService
	) {}

	async create(createTrainerDto: TrainerInterface) {
		const trainer = await this.trainerModel.create(createTrainerDto);
		await this.sqsService.send(SqsQueuesNamesEnum.SEARCH_IMAGES, {
			body: trainer._id,
			id: trainer._id.toString(),
			groupId: MessageGroupsIdsEnum.IMAGES,
		});
		return trainer;
	}

	async findAll(filter: FilterQuery<Trainer> = {}) {
		return this.trainerModel.find(filter).exec();
	}

	async findOne(filter: FilterQuery<Trainer>) {
		return this.trainerModel.findOne(filter).exec();
	}

	async update(filter: FilterQuery<Trainer>, updateTrainerDto: UpdateTrainerDto) {
		return this.trainerModel.findOneAndUpdate(filter, updateTrainerDto, { new: true });
	}

	async remove(filter: FilterQuery<Trainer>) {
		return this.trainerModel.findOneAndDelete(filter);
	}
}
