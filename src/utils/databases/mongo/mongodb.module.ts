import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbConfig } from '../../configs/mongodb.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [mongodbConfig],
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get('mongo.uri'),
			}),
			inject: [ConfigService],
		}),
	],
})
export class MongodbModule {}
