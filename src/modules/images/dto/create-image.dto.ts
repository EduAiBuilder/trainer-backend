import { IsEnum, IsString } from 'class-validator';
import { ImageSourceEnum } from '../enums/image-source.enum';

export class CreateImageDto {
	@IsString()
	image_url: string;

	@IsString()
	thumbnail_url: string;

	@IsEnum(ImageSourceEnum)
	source: ImageSourceEnum;

	@IsString()
	init_category: string;
}
