import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { ModelEntity } from '../../models/entities/model.entity';

@Entity('trainers')
export class TrainerEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 2048, default: null })
	description: string;

	@Column({ type: 'int', width: 11, name: 'user_id' })
	userId: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.trainers) // Assuming User entity has a trainers property
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@OneToMany(() => Category, (category) => category.trainer)
	categories: Category[];

	@OneToMany(() => ModelEntity, (model) => model.trainer)
	models: ModelEntity[];
}
