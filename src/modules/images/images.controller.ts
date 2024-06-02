import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../utils/decorators/user.decorator';
import { TrainersService } from '../trainers/trainers.service';

@UseGuards(JwtAuthGuard)
@Controller('trainers/:trainerId/images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService, private readonly trainersService: TrainersService) {}

	@Post('search')
	async searchImages(@Param('trainerId') trainerId: string, @User('userId') userId: string) {
		const trainer = await this.trainersService.findOne({ _id: trainerId, userId });
		if (!trainer) {
			throw new HttpException(`Trainer ${trainerId} not found for user ${userId}`, HttpStatus.NOT_FOUND);
		}
		return this.imagesService.searchImages(trainerId, trainer.categories, userId);
	}

	@Post()
	create(@Body() createImageDto: CreateImageDto, @User('userId') userId: string) {
		return this.imagesService.create({ ...createImageDto, created_by: userId });
	}

	@Get()
	async findAll(@Param('trainerId') trainerId: string, @User('userId') userId: string) {
		return this.imagesService.findAll();
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.imagesService.remove(+id);
	}
}
