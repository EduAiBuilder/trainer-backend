import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ModelEntity } from '../../models/entities/model.entity';

@Entity('epochs')
export class EpochEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int', width: 11, name: 'model_id' })
	modelId: number;

	@Column({ type: 'int', width: 11, name: 'epoch_number' })
	epochNumber: number;

	@Column({ type: 'float', name: 'loss_value' })
	lossValue: number;

	@Column({ type: 'float', name: 'accuracy_value' })
	accuracyValue: number;

	@Column({ type: 'float', name: 'val_loss_value' })
	valLossValue: number;

	@Column({ type: 'float', name: 'learning_rate' })
	learningRate: number;

	@Column({ type: 'float', name: 'training_time' })
	trainingTime: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => ModelEntity, (model) => model.epochs)
	@JoinColumn({ name: 'model_id' })
	model: ModelEntity;
}
