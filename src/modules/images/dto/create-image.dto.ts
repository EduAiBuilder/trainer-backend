import { IsEnum, IsString } from 'class-validator';
import { ImageSourceEnum } from '../enums/image-source.enum';

export class CreateImageDto {
	@IsString()
	imageUrl: string;

	@IsString()
	thumbnailUrl: string;

	@IsEnum(ImageSourceEnum)
	source: ImageSourceEnum;

	@IsString()
	initCategory: string;
}
