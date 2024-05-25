import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
	environment: process.env.APP_ENVIRONMENT || 'development',
	port: process.env.PORT || 3000,
}));
