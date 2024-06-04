import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ImageSourceEnum } from '../enums/image-source.enum';
import { TrainersCategoriesImagesEntity } from '../trainers-categories-images/entities/trainers-categories-images.entity';

@Entity('images')
export class ImageEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ type: 'varchar', length: 100, name: 'created_by' })
	createdBy: string;

	@Column({ type: 'varchar', length: 1024, name: 'image_url' })
	imageUrl: string;

	@Column({ type: 'varchar', length: 1024, default: null, name: 'thumbnail_url' })
	thumbnailUrl: string;

	@Column({ type: 'enum', enum: ImageSourceEnum, default: ImageSourceEnum.UPLOAD })
	source: ImageSourceEnum;

	@Column({ type: 'varchar', length: 255, name: 'init_category' })
	initCategory: string;

	@OneToOne(() => TrainersCategoriesImagesEntity, (trainersCategoriesImages) => trainersCategoriesImages.image)
	@JoinColumn({ name: 'id', referencedColumnName: 'image_id' })
	trainersCategoriesImages: TrainersCategoriesImagesEntity[];
}
