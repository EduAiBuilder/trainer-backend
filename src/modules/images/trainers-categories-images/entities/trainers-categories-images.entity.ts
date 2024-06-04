import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ImageEntity } from '../../entities/image.entity';

@Entity('trainers_categories_images')
export class TrainersCategoriesImagesEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;

	@Column({ type: 'varchar', length: 100, name: 'created_by' })
	createdAy: string;

	@Column({ type: 'int', width: 11, foreignKeyConstraintName: 'images', name: 'image_id' })
	imageId: number;

	@Column({ type: 'varchar', length: 256, name: 'trainer_id' })
	trainerId: string;

	@Column({ type: 'varchar', length: 256, name: 'user_id' })
	userId: string;

	@Column({ type: 'varchar', length: 255 })
	category: string;

	@OneToOne(() => ImageEntity, (image) => image.trainersCategoriesImages)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity[];
}
