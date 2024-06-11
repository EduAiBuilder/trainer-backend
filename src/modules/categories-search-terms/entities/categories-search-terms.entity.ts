import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { SearchTerm } from '../../search-terms/entities/search-term.entity';

@Entity('categories_search_terms')
export class CategoriesSearchTerms {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int', width: 11, name: 'category_id' })
	categoryId: number;

	@Column({ type: 'int', width: 11, name: 'search_term_id' })
	searchTermId: number;

	@ManyToOne(() => Category, (category) => category.categoriesSearchTerms)
	@JoinColumn({ name: 'category_id' })
	category: Category;

	@ManyToOne(() => SearchTerm, (searchTerm) => searchTerm.categorySearchTerm)
	@JoinColumn({ name: 'search_term_id' })
	searchTerm: SearchTerm;
}
