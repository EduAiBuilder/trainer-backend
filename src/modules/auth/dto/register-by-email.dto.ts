import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterByEmailDto extends CreateUserDto {
	@ApiProperty()
	@IsEmail()
	email: string;
}
