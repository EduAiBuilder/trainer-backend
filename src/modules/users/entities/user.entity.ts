import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { TrainerEntity } from '../../trainers/entities/trainer.entity';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 255 })
	@Index({ unique: true })
	username: string;

	@Column({ type: 'varchar', length: 255 })
	email: string;

	@Column({ type: 'varchar', length: 255, nullable: true, name: 'first_name' })
	firstName: string;

	@Column({ type: 'varchar', length: 255, nullable: true, name: 'last_name' })
	lastName: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	phone: string;

	@Column({ type: 'boolean', default: false })
	isEmailVerified: boolean;

	@Column({ type: 'boolean', default: false })
	isPhoneVerified: boolean;

	@OneToMany(() => TrainerEntity, (trainer) => trainer.user)
	trainers: TrainerEntity[];
}
