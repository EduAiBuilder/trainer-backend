import { Injectable } from '@nestjs/common';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './schemas/trainer.schema';
import { FilterQuery, Model } from 'mongoose';
import { TrainerInterface } from './interfaces/trainer.interface';

@Injectable()
export class TrainersService {
	constructor(
		@InjectModel(Trainer.name)
		private trainerModel: Model<Trainer>
	) {}

	async create(createTrainerDto: TrainerInterface) {
		return this.trainerModel.create(createTrainerDto);
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
