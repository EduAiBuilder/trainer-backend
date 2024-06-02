import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trainer, TrainerSchema } from './schemas/trainer.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Trainer.name,
				schema: TrainerSchema,
			},
		]),
		AuthModule,
	],
	controllers: [TrainersController],
	providers: [TrainersService],
	exports: [TrainersService],
})
export class TrainersModule {}
