import { Module } from '@nestjs/common';
import { CategoriesSearchTermsService } from './categories-search-terms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesSearchTerms } from './entities/categories-search-terms.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CategoriesSearchTerms])],
	providers: [CategoriesSearchTermsService],
})
export class CategoriesSearchTermsModule {}
