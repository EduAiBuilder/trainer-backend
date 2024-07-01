import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ModelEntity])],
	controllers: [ModelsController],
	providers: [ModelsService],
	exports: [ModelsService],
})
export class ModelsModule {}
