import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Trainer extends Document {
	@Prop({ type: String })
	userId: string;

	@Prop({ type: String })
	name: string;

	@Prop({ type: String })
	description: string;

	@Prop({ type: [String] })
	categories: string[];
}

const TrainerSchema = SchemaFactory.createForClass(Trainer);
TrainerSchema.index({ userId: 1 });

export { TrainerSchema };
