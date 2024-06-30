import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { EpochsModule } from '../epochs/epochs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ModelEntity])],
	controllers: [ModelsController, EpochsModule],
	providers: [ModelsService],
})
export class ModelsModule {}
