import { Module } from '@nestjs/common';
import { SearchTermsImagesService } from './search-terms-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchTermsImages } from './entities/search-terms-images.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SearchTermsImages])],
	providers: [SearchTermsImagesService],
	exports: [SearchTermsImagesService],
})
export class SearchTermsImagesModule {}
