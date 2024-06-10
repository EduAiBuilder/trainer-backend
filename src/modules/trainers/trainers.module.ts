import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { AuthModule } from '../auth/auth.module';
import { SqsConfigModule } from '../../utils/sqs/sqsConfigModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerEntity } from './entities/trainer.entity';

@Module({
	imports: [TypeOrmModule.forFeature([TrainerEntity]), AuthModule, SqsConfigModule],
	controllers: [TrainersController],
	providers: [TrainersService],
	exports: [TrainersService],
})
export class TrainersModule {}
