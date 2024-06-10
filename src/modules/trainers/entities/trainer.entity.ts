import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('trainers')
export class TrainerEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 2048 })
	description: string;

	@Column({ type: 'int', width: 11, name: 'user_id' })
	userId: number;

	@ManyToOne(() => UserEntity, (user) => user.trainers) // Assuming User entity has a trainers property
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@OneToMany(() => Category, (category) => category.trainer)
	categories: Category[];
}
