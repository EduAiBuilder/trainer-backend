import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs/app.config';
import { TrainersModule } from './trainers/trainers.module';
import { UsersModule } from './users/users.module';
import { MongodbModule } from './databases/mongo/mongodb.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfig],
		}),
		TrainersModule,
		UsersModule,
		MongodbModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
