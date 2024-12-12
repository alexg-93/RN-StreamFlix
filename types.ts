// movie types

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | Collection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
  export interface Collection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
 export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }


export interface MoviePage {
    page?: number;
  }

export interface Movies {
  popularMovies: {
    movies : Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  };
  trendingMovies:  {
    movies : Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  };
  upcomingMovies:  {
    movies : Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  };
  isLoadingPopular: boolean;
  isLoadingTrending: boolean;
  isLoadingUpcoming: boolean;
  isError: boolean | string;
};

export interface MoviesResponse { 
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export interface SetCurrentPagePayload {
    movieType: keyof Movies;
    page: number;
};

export interface MoviesProps {
    title: string;
    moviesData: [];
    type?: 'popularMovies' | 'trendingMovies' | 'upcomingMovies' | string;
    displaySeeAll?: boolean;
    displayAmount?: number;
  }
  

// movie details types

export interface MovieDetailsState {
    movieDetails: object;
    isLoading: boolean;
    isError: boolean | string;
};


export interface CastMember {
    name: string;
    profile_path: string;
  }
  
export interface CrewMember {
    name: string;
    profile_path: string;
  }

export  interface Credits {
    cast: CastMember[];
    crew: CrewMember[];
  }
  
export interface IMovieDetails {
    original_title: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    genres: { name: string }[];
    vote_average: number;
    overview: string;
    credits: Credits;
  }


// favorites types
export interface FavoriteMoviesState {
    favorites: Movie[];
};


// search types
export interface SearchState {
    isLoading : boolean,
    error: string | null,
    searchResults: [],
    searchValue: string
}


