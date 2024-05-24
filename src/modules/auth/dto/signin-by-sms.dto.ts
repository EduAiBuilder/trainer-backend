import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninBySmsDto {
	@ApiProperty()
	@IsString()
	phone: string;
}
