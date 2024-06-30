import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpochEntity } from './entities/epoch.entity';
import { CreateEpochDto } from './dtos/create-epoch.dto';

@Injectable()
export class EpochsService {
	constructor(@InjectRepository(EpochEntity) private readonly modelRepository: Repository<EpochEntity>) {}

	async createMany(epochs: CreateEpochDto[], id) {
		return await this.modelRepository.save(epochs.map((epoch) => ({ ...epoch, modelId: id })));
	}
}
