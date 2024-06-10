import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SearchTerm } from '../../search-terms/entities/search-term.entity';
import { ImageEntity } from '../../images/entities/image.entity';

@Entity('search_terms_images')
export class SearchTermsImages {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int', width: 11 })
	image_id: number;

	@Column({ type: 'int', width: 11 })
	search_term_id: number;

	@Column({ type: 'boolean', default: false })
	is_connected: boolean;

	@ManyToOne(() => ImageEntity, (image) => image.searchTermsImages)
	@JoinColumn({ name: 'image_id' })
	image: ImageEntity;

	@ManyToOne(() => SearchTerm, (searchTerm) => searchTerm.searchTermsImages)
	@JoinColumn({ name: 'search_term_id' })
	searchTerm: SearchTerm;
}
