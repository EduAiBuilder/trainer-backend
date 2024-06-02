import { PartialType } from '@nestjs/mapped-types';
import { SearchImagesDto } from './search-images.dto';

export class UpdateImageDto extends PartialType(SearchImagesDto) {}
