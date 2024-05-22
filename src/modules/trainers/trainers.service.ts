import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trainer } from './schemas/trainer.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrainersService {
	constructor(
		@InjectModel(Trainer.name)
		private trainerModel: Model<Trainer>
	) {}

	async create(createTrainerDto: CreateTrainerDto) {
		return this.trainerModel.create(createTrainerDto);
	}

	async findAll() {
		return this.trainerModel.find().exec();
	}

	async findOne(id: string) {
		return this.trainerModel.findById(id).exec();
	}

	async update(id: string, updateTrainerDto: UpdateTrainerDto) {
		return this.trainerModel.findByIdAndUpdate(id, updateTrainerDto, { new: true });
	}

	async remove(id: string) {
		return this.trainerModel.findByIdAndDelete(id);
	}
}
