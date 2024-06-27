import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../utils/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('trainers/:trainerId/images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post()
	create(@Body() createImageDto: CreateImageDto, @User('userId') userId: number) {
		return this.imagesService.create({ ...createImageDto, createdBy: userId });
	}

	@Get()
	async findAll(
		@Param('trainerId', ParseIntPipe) trainerId: number,
		@User('userId') userId: number,
		@Query('categories', new ParseArrayPipe({ optional: true })) categories: number[],
		@Query('page', new ParseIntPipe({ optional: true })) page: number,
		@Query('pageNumbers', new ParseIntPipe({ optional: true })) pageNumbers: number,
		@Query('isRandomRequired') isRandomRequired: boolean
	) {
		return this.imagesService.findImages(trainerId, categories, userId, page, pageNumbers, isRandomRequired);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.imagesService.remove(+id);
	}
}
