import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TrainerEntity } from '../../trainers/entities/trainer.entity';
import { EpochEntity } from '../../epochs/entities/epoch.entity';

@Entity('models')
export class ModelEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 255 })
	key: string;

	@Column({ type: 'int', width: 11, name: 'trainer_id' })
	trainerId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => TrainerEntity, (trainer) => trainer.models)
	@JoinColumn({ name: 'trainer_id' })
	trainer: TrainerEntity;

	@OneToMany(() => EpochEntity, (epoch) => epoch.model)
	epochs: EpochEntity[];
}
