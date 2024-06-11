import { CreateCategoryDto } from '../../categories/dtos/create-category.dto';

export interface TrainerInterface {
	name: string;
	categories: CreateCategoryDto[];
	userId: number;
	description: string;
}
