import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ImageSourceEnum } from '../enums/image-source.enum';

@Entity()
export class ImageEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ type: 'varchar', length: 16 })
	created_by: string;

	@Column({ type: 'varchar', length: 1024 })
	image_url: string;

	@Column({ type: 'varchar', length: 1024, default: null })
	thumbnail_url: string;

	@Column({ type: 'enum', enum: ImageSourceEnum, default: ImageSourceEnum.UPLOAD })
	source: ImageSourceEnum;

	@Column({ type: 'varchar', length: 255 })
	init_category: string;
}
