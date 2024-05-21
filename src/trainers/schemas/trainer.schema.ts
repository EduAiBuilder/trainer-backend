import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class TrainerSchema extends Document {
	@Prop({ type: String })
	name: string;

	@Prop({ type: String })
	description: string;

	@Prop({ type: [String] })
	categories: string[];
}
