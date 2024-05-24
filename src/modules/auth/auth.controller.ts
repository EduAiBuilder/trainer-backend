import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBySmsDto } from './dto/register-by-sms.dto';
import { RegisterByEmailDto } from './dto/register-by-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SigninByEmailDto } from './dto/signin-by-email.dto';
import { SigninBySmsDto } from './dto/signin-by-sms.dto';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register/sms')
	async registerBySms(@Body() registerBySmsDto: RegisterBySmsDto) {
		return this.authService.registerBySms(registerBySmsDto);
	}

	@Post('register/email')
	async registerByEmail(@Body() registerByEmailDto: RegisterByEmailDto) {
		return this.authService.registerByEmail(registerByEmailDto);
	}

	@Post('signin/sms')
	async signinBySms(@Body() signinBySmsDto: SigninBySmsDto) {
		return this.authService.signinBySms(signinBySmsDto);
	}

	@Post('signin/email')
	async signinByEmail(@Body() signinByEmailDto: SigninByEmailDto) {
		return this.authService.signinByEmail(signinByEmailDto);
	}

	@Post('signin/code')
	async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
		return this.authService.signinByCode(verifyCodeDto);
	}

	@Post('register/code')
	async registerByCode(@Body() verifyCodeDto: VerifyCodeDto) {
		return this.authService.registerByCode(verifyCodeDto);
	}
}
