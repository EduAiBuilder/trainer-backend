import { VerifyCodeDto } from '../dto/verify-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyCodes } from './entities/verify-codes.entity';
import { MoreThan, Repository } from 'typeorm';

export class VerifyCodesService {
	constructor(@InjectRepository(VerifyCodes) private readonly verifyCodesRepository: Repository<VerifyCodes>) {}

	async createVerifyCode(userId: number, identifier: string, identifierType: 'email' | 'phone') {
		const expiredAt = this.setFiveMinutesFromNow();
		const code = this.setUniqueCode();
		const verifyCode: Partial<VerifyCodes> = { identifier, userId, expiredAt, code, identifierType };
		const newVerifyCode = this.verifyCodesRepository.create(verifyCode);
		await this.verifyCodesRepository.save(newVerifyCode);
	}

	async checkVerifyCode(verifyCodeDto: VerifyCodeDto) {
		const verifyCode = await this.verifyCodesRepository.findOne({
			where: {
				...verifyCodeDto,
				expiredAt: MoreThan(new Date()),
			},
		});
		if (!verifyCode) {
			throw new Error('Invalid code');
		}
		return verifyCode;
	}

	private setFiveMinutesFromNow() {
		const date = new Date();
		date.setMinutes(date.getMinutes() + 5);
		return date;
	}

	private setUniqueCode() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}
}
