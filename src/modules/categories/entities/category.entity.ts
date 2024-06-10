import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CategoriesSearchTerms } from '../../categories-search-terms/entities/categories-search-terms.entity';
import { TrainerEntity } from '../../trainers/entities/trainer.entity';

@Entity('categories')
export class Category {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int', width: 11 })
	trainer_id: number;

	@ManyToOne(() => TrainerEntity, (trainer) => trainer.categories)
	@JoinColumn({ name: 'trainer_id' })
	trainer: TrainerEntity;

	@OneToMany(() => CategoriesSearchTerms, (categoriesSearchTerms) => categoriesSearchTerms.category)
	categoriesSearchTerms: CategoriesSearchTerms[];
}
