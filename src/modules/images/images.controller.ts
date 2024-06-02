import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { SearchImagesDto } from './dto/search-images.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post('search')
	searchImages(@Body() createImageDto: SearchImagesDto) {
		return this.imagesService.searchImages(createImageDto);
	}

	@Post()
	create(@Body() createImageDto: CreateImageDto) {
		return this.imagesService.create({ ...createImageDto, created_by: '1' });
	}

	@Get()
	async findAll() {
		return this.imagesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.imagesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
		return this.imagesService.update(+id, updateImageDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.imagesService.remove(+id);
	}
}
