import { registerAs } from '@nestjs/config';

export const mongodbConfig = registerAs('mongo', () => ({
	uri: process.env.MONGODB_URI,
	useCreateIndex: true,
}));
