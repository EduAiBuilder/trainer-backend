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
	async create(@Body() createTrainerDto: CreateTrainerDto, @User('userId') userId: string) {
		return this.trainersService.create({ ...createTrainerDto, userId });
	}

	@Get()
	async findAllUsersTrainer(@User('userId') userId: string) {
		return this.trainersService.findAll({ userId });
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.trainersService.findOne({ _id: id });
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto, @User('userId') userId: string) {
		return this.trainersService.update({ _id: id, userId }, updateTrainerDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @User('userId') userId: string) {
		return this.trainersService.remove({ _id: id, userId });
	}
}
