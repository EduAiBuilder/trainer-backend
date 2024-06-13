import { Module } from '@nestjs/common';
import { SearchTermsService } from './search-terms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchTerm } from './entities/search-term.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SearchTerm])],
	providers: [SearchTermsService],
	exports: [SearchTermsService],
})
export class SearchTermsModule {}
