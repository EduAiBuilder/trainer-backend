import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModelsService {
	constructor(@InjectRepository(ModelEntity) private readonly modelRepository: Repository<ModelEntity>) {}

	async create(trainerId: number) {
		const key = Math.random().toString(36).substring(2, 10);
		return await this.modelRepository.save({ key, trainerId });
	}
}
