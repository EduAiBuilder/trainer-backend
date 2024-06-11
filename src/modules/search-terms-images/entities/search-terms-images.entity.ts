import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SearchTerm } from '../../search-terms/entities/search-term.entity';
import { ImageEntity } from '../../images/entities/image.entity';

@Entity('search_terms_images')
export class SearchTermsImages {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int', width: 11, name: 'image_id' })
	imageId: number;

	@Column({ type: 'int', width: 11, name: 'search_term_id' })
	searchTermId: number;

	@Column({ type: 'boolean', default: true, name: 'is_connected' })
	isConnected: boolean;

	@ManyToOne(() => ImageEntity, (image) => image.searchTermsImages)
	@JoinColumn({ name: 'image_id' })
	image: ImageEntity;

	@ManyToOne(() => SearchTerm, (searchTerm) => searchTerm.searchTermsImages)
	@JoinColumn({ name: 'search_term_id' })
	searchTerm: SearchTerm;
}
