import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from '../../categories/dtos/create-category.dto';
import { Type } from 'class-transformer';

export class CreateTrainerDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@ValidateNested({ each: true })
	@Type(() => CreateCategoryDto)
	@IsArray()
	categories: CreateCategoryDto[];
}
