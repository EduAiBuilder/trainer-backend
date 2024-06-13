import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { SearchTermsImages } from '../../search-terms-images/entities/search-terms-images.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('search_terms')
export class SearchTerm {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'int', width: 11, name: 'category_id' })
	categoryId: number;

	@Column({ type: 'int', width: 11, name: 'created_by' })
	createdBy: number;

	@Column({ type: 'int', width: 11, name: 'user_id' })
	userId: number;

	@OneToMany(() => SearchTermsImages, (searchTermsImages) => searchTermsImages.searchTerm)
	searchTermsImages: SearchTermsImages[];

	@ManyToOne(() => Category, (category) => category.searchTerms)
	@JoinColumn({ name: 'category_id' })
	category: Category;
}
