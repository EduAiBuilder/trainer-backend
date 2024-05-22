import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	username: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	lastName: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	phone: string;
}
