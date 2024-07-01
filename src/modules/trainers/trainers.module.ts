import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { AuthModule } from '../auth/auth.module';
import { SqsConfigModule } from '../../utils/sqs/sqsConfigModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ModelsModule } from '../models/models.module';

@Module({
	imports: [TypeOrmModule.forFeature([TrainerEntity]), AuthModule, SqsConfigModule, CategoriesModule, ModelsModule],
	controllers: [TrainersController],
	providers: [TrainersService],
	exports: [TrainersService],
})
export class TrainersModule {}
