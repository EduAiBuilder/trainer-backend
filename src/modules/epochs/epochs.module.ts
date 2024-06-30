import { Module } from '@nestjs/common';
import { EpochsService } from './epochs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpochEntity } from './entities/epoch.entity';

@Module({
	imports: [TypeOrmModule.forFeature([EpochEntity])],
	providers: [EpochsService],
	exports: [EpochsService],
})
export class EpochsModule {}
