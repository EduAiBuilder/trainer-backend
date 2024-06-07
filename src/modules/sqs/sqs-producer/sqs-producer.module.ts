import { Module } from '@nestjs/common';
import { SqsProducerService } from './sqs-producer.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		SqsModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				producers: [
					{
						name: configService.get('sqs.name'),
						queueUrl: configService.get('sqs.url'),
						region: configService.get('sqs.region'),
					},
				],
			}),
			inject: [ConfigService],
		}),
	],
	providers: [SqsProducerService],
	exports: [SqsProducerService],
})
export class SqsProducerModule {}
