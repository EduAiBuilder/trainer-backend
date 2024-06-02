import { Module } from '@nestjs/common';
import { TrainersCategoriesImagesService } from './trainers-categories-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainersCategoriesImagesEntity } from './entities/trainers-categories-images.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TrainersCategoriesImagesEntity])],
	providers: [TrainersCategoriesImagesService],
	exports: [TrainersCategoriesImagesService],
})
export class TrainersCategoriesImagesModule {}
