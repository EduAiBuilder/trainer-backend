import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { BingModule } from '../providers/bing/bing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { TrainersModule } from '../trainers/trainers.module';
import { ImagesSqsConsumer } from './images.sqs-consumer';
import { SqsConfigModule } from '../../utils/sqs/sqsConfigModule';

@Module({
	imports: [BingModule, TrainersModule, TypeOrmModule.forFeature([ImageEntity]), SqsConfigModule],
	controllers: [ImagesController],
	providers: [ImagesService, ImagesSqsConsumer],
})
export class ImagesModule {}
