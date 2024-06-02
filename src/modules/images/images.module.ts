import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { BingModule } from '../providers/bing/bing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';

@Module({
	imports: [BingModule, TypeOrmModule.forFeature([ImageEntity])],
	controllers: [ImagesController],
	providers: [ImagesService],
})
export class ImagesModule {}
