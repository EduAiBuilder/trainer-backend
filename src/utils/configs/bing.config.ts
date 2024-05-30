import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const bingConfig = registerAs('bing', () => ({
	apiKey: process.env.BING_OCP_APIM_SUBSCRIPTION_KEY,
	apiUrl: process.env.BING_API_URL || 'https://api.bing.microsoft.com/v7.0',
}));
