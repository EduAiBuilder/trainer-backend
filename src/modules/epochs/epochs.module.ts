import { Module } from '@nestjs/common';
import { EpochsService } from './epochs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpochEntity } from './entities/epoch.entity';
import { EpochsController } from './epochs.controller';

@Module({
	imports: [TypeOrmModule.forFeature([EpochEntity])],
	controllers: [EpochsController],
	providers: [EpochsService],
	exports: [EpochsService],
})
export class EpochsModule {}
