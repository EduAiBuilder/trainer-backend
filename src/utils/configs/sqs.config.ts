import { registerAs } from '@nestjs/config';

export const sqsConfig = registerAs('sqs', () => ({
	name: process.env.SQS_NAME,
	url: process.env.SQS_URL,
	region: process.env.SQS_REGION,
}));
