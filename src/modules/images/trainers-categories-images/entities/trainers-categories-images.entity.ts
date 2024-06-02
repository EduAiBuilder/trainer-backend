import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ImageEntity } from '../../entities/image.entity';

@Entity('trainers_categories_images')
export class TrainersCategoriesImagesEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ type: 'varchar', length: 100 })
	created_by: string;

	@Column({ type: 'int', width: 11, foreignKeyConstraintName: 'images' })
	image_id: number;

	@Column({ type: 'varchar', length: 256 })
	trainer_id: string;

	@Column({ type: 'varchar', length: 256 })
	user_id: string;

	@Column({ type: 'varchar', length: 255 })
	category: string;

	@ManyToMany(() => ImageEntity, (image) => image.trainersCategoriesImages)
	@JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
	image: ImageEntity[];
}
