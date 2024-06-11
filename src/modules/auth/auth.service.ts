import { Injectable } from '@nestjs/common';
import { RegisterByEmailDto } from './dto/register-by-email.dto';
import { RegisterBySmsDto } from './dto/register-by-sms.dto';
import { UsersService } from '../users/users.service';
import { VerifyCodesService } from './verify-codes/verify-codes.service';
import { SigninBySmsDto } from './dto/signin-by-sms.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { SigninByEmailDto } from './dto/signin-by-email.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private verifyCodeService: VerifyCodesService, private jwtService: JwtService) {}

	async registerByEmail(registerByEmailDto: RegisterByEmailDto) {
		await this.validateUserExistence({ email: registerByEmailDto.email, isEmailVerified: true });
		const user = await this.userService.create(registerByEmailDto);
		const verifyCode = await this.verifyCodeService.createVerifyCode(user.id, user.email, 'email');
		// send email
	}

	async registerBySms(registerBySmsDto: RegisterBySmsDto) {
		await this.validateUserExistence({ phone: registerBySmsDto.phone, isPhoneVerified: true });
		const user = await this.userService.create(registerBySmsDto);
		const verifyCode = await this.verifyCodeService.createVerifyCode(user.id, user.phone, 'phone');
		// send sms
	}

	async signinBySms(signinBySmsDto: SigninBySmsDto) {
		const user = await this.userService.findOne({ phone: signinBySmsDto.phone });
		if (!user) {
			throw new Error('User not found');
		}
		const verifyCode = await this.verifyCodeService.createVerifyCode(user.id, user.phone, 'email');
		// send sms
	}

	async signinByEmail(signinByEmailDto: SigninByEmailDto) {
		const user = await this.userService.findOne({ email: signinByEmailDto.email, isEmailVerified: true });
		if (!user) {
			throw new Error('User not found');
		}
		const verifyCode = await this.verifyCodeService.createVerifyCode(user.id, user.email, 'email');
		// send email
	}

	private async validateUserExistence(where: FindOptionsWhere<UserEntity>) {
		const user = await this.userService.findOne(where);
		if (user) {
			throw new Error(`The user with this ${Object.keys(where)[0]} already exists`);
		}
	}

	async registerByCode(verifyCodeDto: VerifyCodeDto) {
		const verifyCode = await this.verifyCodeService.checkVerifyCode(verifyCodeDto);
		let update;
		if (verifyCode.identifierType === 'email') {
			update = { isEmailVerified: true };
		} else {
			update = { isPhoneVerified: true };
		}
		return await this.userService.update(verifyCode.userId, update);
	}

	async signinByCode(verifyCodeDto: VerifyCodeDto) {
		const verifyCode = await this.verifyCodeService.checkVerifyCode(verifyCodeDto);
		return this.userService.findOne({ id: verifyCode.userId });
	}

	generateToken(user: UserEntity) {
		const payload = { sub: user.id };
		return this.jwtService.sign(payload);
	}
}
