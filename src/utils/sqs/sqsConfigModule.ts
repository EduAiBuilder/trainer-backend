import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { sqsConfig } from '../configs/sqs.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [sqsConfig],
		}),
		SqsModule.registerAsync({
			imports: [ConfigModule],

			useFactory: (configService: ConfigService) => {
				const searchImagesQueueConfig = configService.get('sqs.searchImages');
				return {
					consumers: [searchImagesQueueConfig],
					producers: [searchImagesQueueConfig],
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class SqsConfigModule {}
