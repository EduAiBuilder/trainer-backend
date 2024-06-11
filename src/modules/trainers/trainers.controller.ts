import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../utils/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('trainers')
export class TrainersController {
	constructor(private readonly trainersService: TrainersService) {}

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
}
