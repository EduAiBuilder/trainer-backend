import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ImageSourceEnum } from '../enums/image-source.enum';
import { SearchTermsImages } from '../../search-terms-images/entities/search-terms-images.entity';

@Entity('images')
export class ImageEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ type: 'varchar', length: 100, name: 'created_by' })
	createdBy: number;

	@Column({ type: 'varchar', length: 1024, name: 'image_url' })
	imageUrl: string;

	@Column({ type: 'varchar', length: 1024, default: null, name: 'thumbnail_url' })
	thumbnailUrl: string;

	@Column({ type: 'enum', enum: ImageSourceEnum, default: ImageSourceEnum.UPLOAD })
	source: ImageSourceEnum;

	@Column({ type: 'int', width: 11, name: 'init_search_term_id' })
	initSearchTermId: number;

	@OneToMany(() => SearchTermsImages, (searchTermsImages) => searchTermsImages.image)
	searchTermsImages: SearchTermsImages[];
}
