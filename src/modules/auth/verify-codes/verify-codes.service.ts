import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerifyCodes } from './schemas/verify-codes.schema';
import { VerifyCodeDto } from '../dto/verify-code.dto';

export class VerifyCodesService {
	constructor(
		@InjectModel(VerifyCodes.name)
		private verifyCodeModel: Model<VerifyCodes>
	) {}

	async createVerifyCode(userId: string, identifier: string, type: string) {
		const expiredAt = this.setFiveMinutesFromNow();
		const code = this.setUniqueCode();
		await this.verifyCodeModel.create({ identifier, userId, expiredAt, code, type });
	}

	async checkVerifyCode(verifyCodeDto: VerifyCodeDto) {
		const verifyCode = await this.verifyCodeModel.findOne({ ...verifyCodeDto, expiredAt: { $gt: new Date() } });
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
