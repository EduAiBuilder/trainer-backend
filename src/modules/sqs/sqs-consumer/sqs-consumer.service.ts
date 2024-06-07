import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as SQS from '@aws-sdk/client-sqs';

@Injectable()
export class SqsConsumerService {
	@SqsMessageHandler('queueName', false)
	async handleMessage(message: SQS.Message) {
		const obj: any = JSON.parse(message.Body) as {
			message: string;
			date: string;
		};
		const { data } = JSON.parse(obj.Message);

		// use the data and consume it the way you want //
	}
}
