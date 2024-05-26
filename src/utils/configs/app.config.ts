import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
	environment: process.env.APP_ENVIRONMENT || 'development',
	port: process.env.PORT || 3000,
	clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
}));
