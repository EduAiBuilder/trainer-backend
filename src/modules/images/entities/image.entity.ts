import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ImageSourceEnum } from '../enums/image-source.enum';
import { TrainersCategoriesImagesEntity } from '../trainers-categories-images/entities/trainers-categories-images.entity';

@Entity('images')
export class ImageEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ type: 'varchar', length: 100 })
	created_by: string;

	@Column({ type: 'varchar', length: 1024 })
	image_url: string;

	@Column({ type: 'varchar', length: 1024, default: null })
	thumbnail_url: string;

	@Column({ type: 'enum', enum: ImageSourceEnum, default: ImageSourceEnum.UPLOAD })
	source: ImageSourceEnum;

	@Column({ type: 'varchar', length: 255 })
	init_category: string;

	@OneToOne(() => TrainersCategoriesImagesEntity, (trainersCategoriesImages) => trainersCategoriesImages.image)
	@JoinColumn({ name: 'id', referencedColumnName: 'image_id' })
	trainersCategoriesImages: TrainersCategoriesImagesEntity[];
}
