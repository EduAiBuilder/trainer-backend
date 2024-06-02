import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { BingModule } from '../providers/bing/bing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { TrainersModule } from '../trainers/trainers.module';
import { TrainersCategoriesImagesModule } from './trainers-categories-images/trainers-categories-images.module';

@Module({
	imports: [BingModule, TrainersModule, TypeOrmModule.forFeature([ImageEntity]), TrainersCategoriesImagesModule],
	controllers: [ImagesController],
	providers: [ImagesService],
})
export class ImagesModule {}
