import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BingService } from '../providers/bing/bing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import { ImageSourceEnum } from './enums/image-source.enum';
import { TrainerEntity } from '../trainers/entities/trainer.entity';
import { SearchTermsImagesService } from '../search-terms-images/search-terms-images.service';
import { SearchTerm } from '../search-terms/entities/search-term.entity';

@Injectable()
export class ImagesService {
	constructor(
		private bingService: BingService,
		@InjectRepository(ImageEntity) private imageRepository: Repository<ImageEntity>,
		private searchTermsImagesService: SearchTermsImagesService
	) {}

	async searchImages(trainer: TrainerEntity, userId: number) {
		const searchTerms = trainer.categories?.flatMap((category) => category?.searchTerms);
		if (!searchTerms?.length) {
			throw new HttpException(`No search terms found for trainer ${trainer.id} and user ${userId}`, HttpStatus.NOT_FOUND);
		}
		const nameSearchTermMap = searchTerms.reduce((acc, searchTerm) => {
			acc[searchTerm.name] = searchTerm;
			return acc;
		}, {});
		const alreadySearchResult = await this.findAlreadySearched(searchTerms);
		const { nonSearchedTerms, notConnectedTrainerTerms } = alreadySearchResult;
		await this.connectBetweenImagesAndTrainer(notConnectedTrainerTerms, nameSearchTermMap);
		return this.providerSearch(nonSearchedTerms, userId);
	}

	async findImages(trainerId: number, categories: number[], userId: number, page: number, pageNumbers = 10, isRandomRequired = false) {
		const query = this.imageRepository
			.createQueryBuilder('image')
			.select('image')
			.innerJoin('image.searchTermsImages', 'searchTermsImages')
			.innerJoin('searchTermsImages.searchTerm', 'searchTerm')
			.where('searchTerm.trainer_id = :trainerId', { trainerId })
			.andWhere('searchTerm.user_id = :userId', { userId })
			.limit(pageNumbers)
			.select('image.id as id, image.image_url as url, image.thumbnail_url as thumbnailUrl, image.source as source');

		if (isRandomRequired) {
			query.orderBy('RAND()');
		}

		if (categories?.length) {
			query.andWhere('category.id IN (:...categories)', { categories });
		}

		if (page) {
			query.offset(page * pageNumbers);
		}

		return query.getRawMany();
	}

	async providerSearch(searchTerms: SearchTerm[], userId: number) {
		if (!searchTerms.length) {
			return;
		}
		const searchTermImages = await this.bingService.searchImages(searchTerms);
		const images = searchTermImages.map(({ searchTermId, images }) => {
			return images.map((image) => {
				const newImage: Partial<ImageEntity> = {
					initSearchTermId: searchTermId,
					imageUrl: image.imageUrl,
					thumbnailUrl: image.thumbnailUrl,
					source: ImageSourceEnum.BING,
					createdBy: userId,
				};
				return this.imageRepository.create(newImage);
			});
		});
		const imagesToSave = images.flat();

		const newImages = await this.imageRepository.save(imagesToSave);
		const searchTermsImages = newImages.map((image) => {
			return {
				imageId: image.id,
				searchTermId: image.initSearchTermId,
			};
		});
		return this.searchTermsImagesService.createBatch(searchTermsImages);
	}

	remove(id: number) {
		return `This action removes a #${id} image`;
	}

	async create(createImageDto: Partial<ImageEntity>) {
		return this.imageRepository.save(createImageDto);
	}

	private async findAlreadySearched(searchTerms: SearchTerm[]) {
		const searchTermImages: {
			searchTermId: number;
			searchTermName: string;
			imageCount: number;
		}[] = await this.imageRepository
			.createQueryBuilder('image')
			.select('searchTerm.id', 'searchTermId')
			.addSelect('searchTerm.name', 'searchTermName')
			.addSelect('COUNT(DISTINCT image.id)', 'imageCount')
			.innerJoin('image.searchTermsImages', 'searchTermsImages')
			.innerJoin('searchTermsImages.searchTerm', 'searchTerm')
			.where('searchTerm.name IN (:...searchTerms) AND image.source = :source', {
				searchTerms: searchTerms.map((searchTerm) => searchTerm.name),
				source: ImageSourceEnum.BING,
			})
			.groupBy('searchTerm.id')
			.addGroupBy('searchTerm.name')
			.addGroupBy('searchTerm.trainerId')
			.getRawMany();

		const searchTermIdImagesMap = searchTermImages.reduce((acc, searchTermImage) => {
			acc[searchTermImage.searchTermId] = searchTermImage;
			return acc;
		}, {});
		const searchTermNameImagesMap = searchTermImages.reduce((acc, searchTermImage) => {
			acc[searchTermImage.searchTermName] = searchTermImage;
			return acc;
		}, {});
		const alreadySearchedTerms = [];
		const nonSearchedTerms = searchTerms.filter((searchTerm) => {
			if (!searchTermNameImagesMap[searchTerm.name]) {
				return true;
			} else {
				alreadySearchedTerms.push(searchTerm);
			}
		});
		const notConnectedTrainerTerms = alreadySearchedTerms.filter((searchTerm) => !searchTermIdImagesMap[searchTerm.id]);

		return { nonSearchedTerms, notConnectedTrainerTerms };
	}

	private async connectBetweenImagesAndTrainer(notConnectedTrainerTerms: SearchTerm[], nameSearchTermMap: Record<string, SearchTerm>) {
		if (!notConnectedTrainerTerms.length) {
			return;
		}
		const searchTermsImages = await this.imageRepository
			.createQueryBuilder('image')
			.select(['DISTINCT image.id AS imageId', 'searchTerm.name AS searchTermName'])
			.innerJoin('image.searchTermsImages', 'searchTermsImages')
			.innerJoin('searchTermsImages.searchTerm', 'searchTerm')
			.where('searchTerm.name IN (:...searchTerms)', {
				searchTerms: notConnectedTrainerTerms.map((searchTerm) => searchTerm.name),
			})
			.getRawMany();

		const searchTermsImagesToSave = searchTermsImages
			.map((searchTermImage) => {
				return {
					imageId: searchTermImage.imageId,
					searchTermId: nameSearchTermMap[searchTermImage.searchTermName]?.id,
				};
			})
			.filter((searchTermImage) => searchTermImage.searchTermId);

		return this.searchTermsImagesService.createBatch(searchTermsImagesToSave);
	}
}
