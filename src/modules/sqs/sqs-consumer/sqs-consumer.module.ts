import { Module } from '@nestjs/common';
import { SqsConsumerService } from './sqs-consumer.service';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		SqsModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				consumers: [
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
	providers: [SqsConsumerService],
	exports: [SqsConsumerService],
})
export class SqsConsumerModule {}
