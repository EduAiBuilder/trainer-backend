import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class VerifyCodes extends Document {
	@Prop({ type: String })
	userId: string;

	@Prop({ type: String })
	code: string;

	@Prop({ type: Date })
	expiredAt: Date;

	@Prop({ type: String })
	identifier: string;

	@Prop({ type: String })
	identifierType: 'email' | 'phone';

	@Prop({ type: String })
	type: 'email' | 'phone';
}

const VerifyCodesSchema = SchemaFactory.createForClass(VerifyCodes);
VerifyCodesSchema.index({ code: 1, identifier: 1 });

export { VerifyCodesSchema };
