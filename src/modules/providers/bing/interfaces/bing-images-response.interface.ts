interface Thumbnail {
	thumbnailUrl: string;
}

interface InsightsMetadata {
	pagesIncludingCount: number;
	availableSizesCount: number;
}

interface Image {
	webSearchUrl: string;
	name: string;
	thumbnailUrl: string;
	datePublished: string;
	isFamilyFriendly: boolean;
	contentUrl: string;
	hostPageUrl: string;
	contentSize: string;
	encodingFormat: string;
	hostPageDisplayUrl: string;
	width: number;
	height: number;
	hostPageFavIconUrl: string;
	hostPageDomainFriendlyName: string;
	hostPageDiscoveredDate: string;
	isTransparent: boolean;
	thumbnail: {
		width: number;
		height: number;
	};
	imageInsightsToken: string;
	insightsMetadata: InsightsMetadata;
	imageId: string;
	accentColor: string;
}

interface QueryExpansion {
	text: string;
	displayText: string;
	webSearchUrl: string;
	searchLink: string;
	thumbnail: Thumbnail;
}

interface RelatedSearch {
	text: string;
	displayText: string;
	webSearchUrl: string;
	searchLink: string;
	thumbnail: Thumbnail;
}

interface PivotSuggestion {
	pivot: string;
	suggestions: any[]; // Assuming suggestions is an empty array based on the provided data
}

interface QueryContext {
	originalQuery: string;
	alterationDisplayQuery: string;
	alterationOverrideQuery: string;
	alterationMethod: string;
	alterationType: string;
}

interface ResponseInstrumentation {
	_type: string;
}

export interface BingImageResponseInterface {
	_type: string;
	instrumentation: ResponseInstrumentation;
	readLink: string;
	webSearchUrl: string;
	queryContext: QueryContext;
	totalEstimatedMatches: number;
	nextOffset: number;
	currentOffset: number;
	value: Image[];
	queryExpansions: QueryExpansion[];
	pivotSuggestions: PivotSuggestion[];
	relatedSearches: RelatedSearch[];
}
