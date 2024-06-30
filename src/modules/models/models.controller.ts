import { Body, Controller, Post } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dtos/create-model.dto';
import { EpochsService } from '../epochs/epochs.service';

@Controller('models')
export class ModelsController {
	constructor(private readonly modelsService: ModelsService, private readonly epochsService: EpochsService) {}

	@Post()
	async create(@Body() model: CreateModelDto) {
		const { epochs, ...restModel } = model;
		const savedModel = await this.modelsService.create(restModel);
		return await this.epochsService.createMany(epochs, savedModel.id);
	}
}
