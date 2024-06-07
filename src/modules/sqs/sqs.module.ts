import { Module } from '@nestjs/common';
import { SqsConsumerModule } from './sqs-consumer/sqs-consumer.module';
import { SqsProducerModule } from './sqs-producer/sqs-producer.module';
import { ConfigModule } from '@nestjs/config';
import { sqsConfig } from '../../utils/configs/sqs.config';

@Module({
	imports: [
		SqsConsumerModule,
		SqsProducerModule,
		ConfigModule.forRoot({
			load: [sqsConfig],
		}),
	],
})
export class SqsModule {}
