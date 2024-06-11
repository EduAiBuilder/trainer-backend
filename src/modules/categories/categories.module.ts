import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { SearchTermsModule } from '../search-terms/search-terms.module';

@Module({
	imports: [TypeOrmModule.forFeature([Category]), SearchTermsModule],
	providers: [CategoriesService],
	exports: [CategoriesService],
})
export class CategoriesModule {}
