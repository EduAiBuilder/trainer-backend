import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { BingImageResponseInterface } from './interfaces/bing-images-response.interface';

@Injectable()
export class BingService {
	private bingApiUrl: string;
	private headers;

	constructor(private httpService: HttpService, private configService: ConfigService) {
		this.bingApiUrl = this.configService.get('bing.apiUrl');
		this.headers = {
			'Ocp-Apim-Subscription-Key': configService.get('bing.apiKey'),
		};
	}

	async searchImages(categories: string[]) {
		const categoriesImages: Record<string, { imageUrl: string; thumbnailUrl: string }[]> = {};
		for (const category of categories) {
			categoriesImages[category] = await this.getImagesFromBingApi(category);
		}
		return categoriesImages;
	}

	async getImagesFromBingApi(category: string, count = 150): Promise<{ imageUrl: string; thumbnailUrl: string }[]> {
		const imagesEndpoint = '/images/search';
		const response = await firstValueFrom(
			this.httpService.get<BingImageResponseInterface>(`${this.bingApiUrl}${imagesEndpoint}`, {
				headers: this.headers,
				params: {
					q: category,
					count,
					min_height: 128,
					min_width: 128,
				},
			})
		);
		const images = response.data.value;
		const imagesUrls = images.map((imageObj) => {
			if (!imageObj?.contentUrl) {
				return;
			}
			return {
				imageUrl: imageObj.contentUrl,
				thumbnailUrl: imageObj.thumbnailUrl,
			};
		});
		return imagesUrls.filter((image) => image);
	}
}
