import { MongooseModule } from '@nestjs/mongoose';
import { VerifyCodesService } from './verify-codes.service';
import { VerifyCodes, VerifyCodesSchema } from './schemas/verify-codes.schema';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: VerifyCodes.name,
				schema: VerifyCodesSchema,
			},
		]),
	],
	providers: [VerifyCodesService],
	exports: [VerifyCodesService],
})
export class VerifyCodesModule {}
