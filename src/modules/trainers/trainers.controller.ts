import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../utils/decorators/user.decorator';
import { TrainerCategoriesImagesResponseDto } from './dto/trainer-categories-images-response.dto';
import { ModelsService } from '../models/models.service';

@UseGuards(JwtAuthGuard)
@Controller('trainers')
export class TrainersController {
	SYSTEM_USER_ID = -1; //todo - get from env
	constructor(private readonly trainersService: TrainersService, private modelsService: ModelsService) {}

	@Post()
	async create(@Body() createTrainerDto: CreateTrainerDto, @User('userId') userId: number) {
		return this.trainersService.create({ ...createTrainerDto, userId });
	}

	@Get()
	async findAllUsersTrainer(@User('userId') userId: number) {
		return this.trainersService.findAll({ userId });
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		return this.trainersService.findOne({ id });
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() updateTrainerDto: UpdateTrainerDto, @User('userId') userId: number) {
		const { categories, ...rest } = updateTrainerDto;
		return this.trainersService.update({ id, userId }, rest);
	}

	@Delete(':id')
	async remove(@Param('id') id: number, @User('userId') userId: number) {
		return this.trainersService.remove({ id, userId });
	}

	@Get(':trainerId/categories/images')
	async getImagesByCategories(@Param('trainerId') trainerId: number, @User('userId') userId: number): Promise<TrainerCategoriesImagesResponseDto[]> {
		if (userId === this.SYSTEM_USER_ID) {
			const trainerData = await this.trainersService.findTrainersUser({ id: trainerId });
			userId = trainerData.userId;
		}
		return this.trainersService.getImagesByCategories(trainerId, userId);
	}

	@Post(':trainerId/train')
	async train(@Param('trainerId') trainerId: number, @User('userId') userId: number) {
		await this.trainersService.validateTrainingReady(trainerId, userId);
		const model = await this.modelsService.create(trainerId);
		return this.trainersService.sendTrainMessageToQueue(trainerId, model.key, model.id);
	}
}
