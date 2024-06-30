import { CreateEpochDto } from '../../epochs/dtos/create-epoch.dto';

export class CreateModelDto {
	key: string;
	trainerId: number;
	epochs: CreateEpochDto[];
}
