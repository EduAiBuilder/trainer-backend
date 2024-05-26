import { Injectable } from '@nestjs/common';
import { RegisterByEmailDto } from './dto/register-by-email.dto';
import { RegisterBySmsDto } from './dto/register-by-sms.dto';
import { UsersService } from '../users/users.service';
import { VerifyCodesService } from './verify-codes/verify-codes.service';
import { FilterQuery } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { SigninBySmsDto } from './dto/signin-by-sms.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SigninByEmailDto } from './dto/signin-by-email.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private verifyCodeService: VerifyCodesService, private jwtService: JwtService) {}

	async registerByEmail(registerByEmailDto: RegisterByEmailDto) {
		await this.validateUserExistence({ email: registerByEmailDto.email, isEmailVerified: true });
		const user = await this.userService.create(registerByEmailDto);
		const verifyCode = await this.verifyCodeService.createVerifyCode(user._id.toString(), user.email, 'email');
		// send email
	}

	async registerBySms(registerBySmsDto: RegisterBySmsDto) {
		await this.validateUserExistence({ phone: registerBySmsDto.phone, isPhoneVerified: true });
		const user = await this.userService.create(registerBySmsDto);
		const verifyCode = await this.verifyCodeService.createVerifyCode(user._id.toString(), user.phone, 'phone');
		// send sms
	}

	async signinBySms(signinBySmsDto: SigninBySmsDto) {
		const user = await this.userService.findOne({ phone: signinBySmsDto.phone });
		if (!user) {
			throw new Error('User not found');
		}
		const verifyCode = await this.verifyCodeService.createVerifyCode(user._id.toString(), user.phone, 'email');
		// send sms
	}

	async signinByEmail(signinByEmailDto: SigninByEmailDto) {
		const user = await this.userService.findOne({ email: signinByEmailDto.email, isEmailVerified: true });
		if (!user) {
			throw new Error('User not found');
		}
		const verifyCode = await this.verifyCodeService.createVerifyCode(user._id.toString(), user.email, 'email');
		// send email
	}

	private async validateUserExistence(filter: FilterQuery<User>) {
		const user = await this.userService.findOne(filter);
		if (user) {
			throw new Error(`The user with this ${Object.keys(filter)[0]} already exists`);
		}
	}

	async registerByCode(verifyCodeDto: VerifyCodeDto) {
		const verifyCode = await this.verifyCodeService.checkVerifyCode(verifyCodeDto);
		let update;
		if (verifyCode.type === 'email') {
			update = { isEmailVerified: true };
		} else {
			update = { isPhoneVerified: true };
		}
		return await this.userService.update(verifyCode.userId, { $set: update });
	}

	async signinByCode(verifyCodeDto: VerifyCodeDto) {
		const verifyCode = await this.verifyCodeService.checkVerifyCode(verifyCodeDto);
		return this.userService.findOne({ _id: verifyCode.userId });
	}

	generateToken(user: User) {
		const payload = { sub: user._id };
		return this.jwtService.sign(payload);
	}
}
