import { registerAs } from '@nestjs/config';

export const sqsConfig = registerAs('sqs', () => ({}));
