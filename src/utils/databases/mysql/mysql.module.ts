import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mysqlConfig } from '../../configs/mysql.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [mysqlConfig],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('mysql.host'),
				port: +configService.get('mysql.port'),
				username: configService.get('mysql.user'),
				password: configService.get('mysql.password'),
				database: configService.get('mysql.database'),
				entities: [__dirname + '/../../../**/*.entity.{js,ts}'],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
})
export class MysqlModule {}
