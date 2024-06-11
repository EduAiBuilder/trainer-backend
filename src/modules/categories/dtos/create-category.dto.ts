import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsString({ each: true })
	searchTerms: string[];
}
