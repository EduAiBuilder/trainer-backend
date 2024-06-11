import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { BingImageResponseInterface } from './interfaces/bing-images-response.interface';
import { SearchTerm } from '../../search-terms/entities/search-term.entity';
import { ProviderImageResponseInterface } from './interfaces/provider-image-response.interface';

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

	async searchImages(searchTerms: SearchTerm[]): Promise<
		{
			images: ProviderImageResponseInterface[];
			searchTermId: number;
		}[]
	> {
		const searchTermImages: { images: ProviderImageResponseInterface[]; searchTermId: number }[] = [];
		for (const searchTerm of searchTerms) {
			const searchTermImage = { images: await this.getImagesFromBingApi(searchTerm.name), searchTermId: searchTerm.id };
			searchTermImages.push(searchTermImage);
		}
		return searchTermImages;
	}

	async getImagesFromBingApi(searchTerm: string, count = 150): Promise<ProviderImageResponseInterface[]> {
		const response = await this.getBingImagesApiCall(searchTerm, count);
		const images = response?.data?.value;
		if (!images?.length) {
			return [];
		}
		const imagesUrls = images.map((imageObj) => {
			if (!imageObj?.contentUrl) {
				return;
			}
			return {
				imageUrl: imageObj.contentUrl,
				thumbnailUrl: imageObj.thumbnailUrl,
				imageProviderName: imageObj.name,
			};
		});
		return imagesUrls.filter((image) => image);
	}

	private async getBingImagesApiCall(searchTerm: string, count: number) {
		const imagesEndpoint = '/images/search';

		return firstValueFrom(
			this.httpService.get<BingImageResponseInterface>(`${this.bingApiUrl}${imagesEndpoint}`, {
				headers: this.headers,
				params: {
					q: searchTerm,
					count,
					min_height: 128,
					min_width: 128,
				},
			})
		);
	}
}
