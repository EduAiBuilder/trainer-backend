import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBySmsDto } from './dto/register-by-sms.dto';
import { RegisterByEmailDto } from './dto/register-by-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SigninByEmailDto } from './dto/signin-by-email.dto';
import { SigninBySmsDto } from './dto/signin-by-sms.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register/sms')
	registerBySms(@Body() createAuthDto: RegisterBySmsDto) {
		return this.authService.create(createAuthDto);
	}

	@Post('register/email')
	registerByEmail(@Body() createAuthDto: RegisterByEmailDto) {
		return this.authService.create(createAuthDto);
	}

	@Post('signin/sms')
	signinBySms(@Body() createAuthDto: SigninBySmsDto) {
		return this.authService.create(createAuthDto);
	}

	@Post('signin/email')
	signinByEmail(@Body() createAuthDto: SigninByEmailDto) {
		return this.authService.create(createAuthDto);
	}

	@Post('signin/code')
	verifyCode(@Body() createAuthDto: VerifyCodeDto) {
		return this.authService.create(createAuthDto);
	}
}
