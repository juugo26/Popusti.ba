export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
  prev_page?: string;
}

export interface PexelsCuratedResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
  prev_page?: string;
}

class PexelsAPI {
  private apiKey: string;
  private baseUrl = 'https://api.pexels.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async searchPhotos(query: string, page = 1, perPage = 15): Promise<PexelsSearchResponse> {
    return this.makeRequest<PexelsSearchResponse>('/search', {
      query,
      page: page.toString(),
      per_page: perPage.toString(),
    });
  }

  async getCuratedPhotos(page = 1, perPage = 15): Promise<PexelsCuratedResponse> {
    return this.makeRequest<PexelsCuratedResponse>('/curated', {
      page: page.toString(),
      per_page: perPage.toString(),
    });
  }

  async getPhoto(id: number): Promise<{ photo: PexelsPhoto }> {
    return this.makeRequest<{ photo: PexelsPhoto }>(`/photos/${id}`);
  }

  // Helper method to get category-specific search terms
  getCategorySearchTerms(category: string): string[] {
    const searchTerms: Record<string, string[]> = {
      'Groceries': ['grocery store', 'supermarket', 'food shopping', 'fresh produce', 'grocery cart'],
      'Electronics': ['electronics store', 'technology', 'gadgets', 'smartphones', 'computers'],
      'Home': ['home decor', 'furniture', 'home improvement', 'household items', 'interior design'],
      'Cosmetics': ['beauty products', 'cosmetics', 'makeup', 'skincare', 'beauty store'],
    };

    return searchTerms[category] || ['store', 'shopping', 'retail'];
  }
}

// Create singleton instance
const pexelsAPI = new PexelsAPI(process.env.NEXT_PUBLIC_PEXELS_API_KEY || '');

export default pexelsAPI;
