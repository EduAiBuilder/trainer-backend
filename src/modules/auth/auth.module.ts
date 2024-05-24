import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { VerifyCodesModule } from './verify-codes/verify-codes.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [VerifyCodesModule, UsersModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
