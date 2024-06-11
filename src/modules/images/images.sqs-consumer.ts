import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { Message } from '@aws-sdk/client-sqs';
import { SqsQueuesNamesEnum } from '../../utils/enums/sqs-queues-names.enum';
import { ImagesService } from './images.service';
import { TrainersService } from '../trainers/trainers.service';

@Injectable()
export class ImagesSqsConsumer {
	constructor(private readonly imagesService: ImagesService, private readonly trainersService: TrainersService) {}

	@SqsMessageHandler(SqsQueuesNamesEnum.SEARCH_IMAGES, false)
	public async handleMessage(message: Message) {
		let trainerId, userId;
		try {
			const messageData = JSON.parse(message.Body);
			trainerId = messageData.trainerId;
			userId = messageData.userId;
			const trainer = await this.trainersService.findOne({ id: trainerId, userId });
			if (!trainer) {
				throw new HttpException(`Trainer ${trainerId} not found for user ${userId}`, HttpStatus.NOT_FOUND);
			}
			// return this.imagesService.searchImages(trainerId, trainer.categories, userId);
		} catch (e) {
			console.log(`can't search images for trainerId ${trainerId} and userId ${userId}`);
		}
	}

	@SqsConsumerEventHandler(SqsQueuesNamesEnum.SEARCH_IMAGES, 'processing_error')
	public onProcessingError(error: Error, message: Message) {
		console.log(error, message);
	}
}
