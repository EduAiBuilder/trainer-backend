import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() createAuthDto: RegisterDto) {
		return this.authService.create(createAuthDto);
	}

	@Post('signin')
	create(@Body() createAuthDto: RegisterDto) {
		return this.authService.create(createAuthDto);
	}
}
