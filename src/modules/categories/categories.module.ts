import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [CategoriesService],
})
export class CategoriesModule {}
