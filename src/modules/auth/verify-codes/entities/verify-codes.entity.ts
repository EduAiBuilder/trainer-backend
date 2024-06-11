import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'verify_codes' })
@Index(['code', 'identifier'])
export class VerifyCodes {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ type: 'varchar', length: 255, name: 'user_id' })
	userId: number;

	@Column({ type: 'varchar', length: 255 })
	code: string;

	@Column({ type: 'timestamp', name: 'expired_at' })
	expiredAt: Date;

	@Column({ type: 'varchar', length: 255 })
	identifier: string;

	@Column({ type: 'varchar', length: 5, name: 'identifier_type' })
	identifierType: 'email' | 'phone';

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
