import { registerAs } from '@nestjs/config';

export const sqsConfig = registerAs('sqs', () => ({
	searchImages: {
		name: process.env.SQS_IMAGES_NAME,
		queueUrl: process.env.SQS_IMAGES_URL,
		region: process.env.SQS_REGION,
	},
	trainModel: {
		name: process.env.SQS_TRAIN_NAME,
		queueUrl: process.env.SQS_TRAIN_URL,
		region: process.env.SQS_REGION,
	},
}));
