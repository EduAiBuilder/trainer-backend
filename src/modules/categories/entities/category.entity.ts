import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TrainerEntity } from '../../trainers/entities/trainer.entity';
import { SearchTerm } from '../../search-terms/entities/search-term.entity';

@Entity('categories')
export class Category {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int', width: 11, name: 'trainer_id' })
	trainerId: number;

	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 1024, default: null })
	description: string;

	@ManyToOne(() => TrainerEntity, (trainer) => trainer.categories)
	@JoinColumn({ name: 'trainer_id' })
	trainer: TrainerEntity;

	@OneToMany(() => SearchTerm, (searchTerms) => searchTerms.category)
	searchTerms: SearchTerm[];
}
