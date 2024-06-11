import { VerifyCodesService } from './verify-codes.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyCodes } from './entities/verify-codes.entity';

@Module({
	imports: [TypeOrmModule.forFeature([VerifyCodes])],
	providers: [VerifyCodesService],
	exports: [VerifyCodesService],
})
export class VerifyCodesModule {}
