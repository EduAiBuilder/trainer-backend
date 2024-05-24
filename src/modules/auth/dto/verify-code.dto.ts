import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyCodeDto {
	@ApiProperty()
	@IsString()
	identifier: string;

	@ApiProperty()
	@IsString()
	code: string;
}
