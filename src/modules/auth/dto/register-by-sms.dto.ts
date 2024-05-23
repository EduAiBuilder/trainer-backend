import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterBySmsDto extends CreateUserDto {
	@ApiProperty()
	@IsString()
	phone: string;
}
