import { Controller, Post, Body, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { Response } from 'express';
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
		await this.authService.registerBySms(registerBySmsDto);
		return { message: 'Verification code sent to your phone', status: 'success' };
	}

	@Post('register/email')
	async registerByEmail(@Body() registerByEmailDto: RegisterByEmailDto) {
		await this.authService.registerByEmail(registerByEmailDto);
		return { message: 'Verification code sent to your email', status: 'success' };
	}

	@Post('signin/sms')
	async signinBySms(@Body() signinBySmsDto: SigninBySmsDto) {
		await this.authService.signinBySms(signinBySmsDto);
		return { message: 'Verification code sent to your phone', status: 'success' };
	}

	@Post('signin/email')
	async signinByEmail(@Body() signinByEmailDto: SigninByEmailDto) {
		await this.authService.signinByEmail(signinByEmailDto);
		return { message: 'Verification code sent to your email', status: 'success' };
	}

	@Post('signin/code')
	async verifyCode(@Body() verifyCodeDto: VerifyCodeDto, @Res() res: Response) {
		const user = await this.authService.signinByCode(verifyCodeDto);
		const accessToken = this.authService.generateToken(user);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});
		res.send(user);
	}

	@Post('register/code')
	async registerByCode(@Body() verifyCodeDto: VerifyCodeDto, @Res() res: Response) {
		const user = await this.authService.registerByCode(verifyCodeDto);
		const accessToken = this.authService.generateToken(user);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});
		res.send(user);
	}
}
