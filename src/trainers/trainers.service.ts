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

	create(createTrainerDto: CreateTrainerDto) {
		return 'This action adds a new trainer';
	}

	findAll() {
		return `This action returns all trainers`;
	}

	findOne(id: number) {
		return `This action returns a #${id} trainer`;
	}

	update(id: number, updateTrainerDto: UpdateTrainerDto) {
		return `This action updates a #${id} trainer`;
	}

	remove(id: number) {
		return `This action removes a #${id} trainer`;
	}
}
