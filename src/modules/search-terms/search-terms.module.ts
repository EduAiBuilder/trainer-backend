import { Module } from '@nestjs/common';
import { SearchTermsService } from './search-terms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchTerm } from './entities/search-term.entity';
import { CategoriesSearchTermsModule } from '../categories-search-terms/categories-search-terms.module';

@Module({
	imports: [TypeOrmModule.forFeature([SearchTerm]), CategoriesSearchTermsModule],
	providers: [SearchTermsService],
	exports: [SearchTermsService],
})
export class SearchTermsModule {}
