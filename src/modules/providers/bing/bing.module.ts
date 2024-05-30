import { Module } from '@nestjs/common';
import { BingService } from './bing.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { bingConfig } from '../../../utils/configs/bing.config';

@Module({
	imports: [
		HttpModule,
		ConfigModule.forRoot({
			load: [bingConfig],
		}),
	],
	providers: [BingService],
	exports: [BingService],
})
export class BingModule {}
