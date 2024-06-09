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

			useFactory: (configService: ConfigService) => ({
				consumers: [
					{
						name: configService.get('sqs.name'),
						queueUrl: configService.get('sqs.url'),
						region: configService.get('sqs.region'),
					},
				],
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
})
export class SqsConfigModule {}
