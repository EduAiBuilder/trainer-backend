import { Body, Controller, Param, Post } from '@nestjs/common';
import { EpochsService } from './epochs.service';
import { CreateEpochDto } from './dtos/create-epoch.dto';

@Controller('models/:modelId/epochs')
export class EpochsController {
	constructor(private readonly epochsService: EpochsService) {}

	@Post()
	async create(@Body() createEpochDto: CreateEpochDto, @Param('modelId') modelId: number) {
		return this.epochsService.create(createEpochDto, modelId);
	}
}
