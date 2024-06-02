import { Injectable } from '@nestjs/common';
import { SearchImagesDto } from './dto/search-images.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { BingService } from '../providers/bing/bing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
	constructor(private bingService: BingService, @InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>) {}

	async searchImages(createImageDto: SearchImagesDto) {
		const categoriesImagesHm = await this.bingService.searchImages(createImageDto.categories);
	}

	async findAll() {
		return this.imageRepository.find();
	}

	findOne(id: number) {
		return `This action returns a #${id} image`;
	}

	update(id: number, updateImageDto: UpdateImageDto) {
		return `This action updates a #${id} image`;
	}

	remove(id: number) {
		return `This action removes a #${id} image`;
	}

	async create(createImageDto: Partial<ImageEntity>) {
		return this.imageRepository.save(createImageDto);
	}
}
