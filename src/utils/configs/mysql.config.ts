import { registerAs } from '@nestjs/config';

export const mysqlConfig = registerAs('mysql', () => ({
	host: process.env.MYSQL_URI,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
}));
