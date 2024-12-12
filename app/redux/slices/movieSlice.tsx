import { AUTHORIZATION, BASE_URL } from '@/constants';
import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { Movies, SetCurrentPagePayload ,Movie,MoviesResponse,MoviePage} from '@/types';


const initialState: Movies = {
  popularMovies: {
    movies: [],
    page: 1,
    total_pages: 0,
    total_results: 0
  },
  trendingMovies:  {
    movies: [],
    page: 1,
    total_pages: 0,
    total_results: 0
  },
  upcomingMovies:  {
    movies: [],
    page: 1,
    total_pages: 0,
    total_results: 0
  },
  isLoadingPopular: false,
  isLoadingTrending: false,
  isLoadingUpcoming: false,
  isError: false,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<SetCurrentPagePayload>) => {
      // update current page by type
      const {movieType: type , page} = action.payload
      if (typeof state[type] !== 'boolean' && typeof state[type] !== 'string') {
        state[type].page = page;
      }
    },
  },
  extraReducers: (builder) => {
    // async api reducers
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoadingPopular = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action:PayloadAction<MoviesResponse>) => {
        const {results, total_pages, total_results} = action.payload;
        state.isLoadingPopular = false;
        state.popularMovies.movies = [...state.popularMovies.movies, ...results];
        state.popularMovies.total_pages= total_pages;
        state.popularMovies.total_results = total_results;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoadingPopular = false;
        state.isError = action.error.message ?? 'Unknown error';
      })

      .addCase(fetchTrendingMovies.pending, (state) => {
        state.isLoadingTrending = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action:PayloadAction<Movie[]>) => {
        state.isLoadingTrending = false;
        state.trendingMovies.movies= action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoadingTrending = false;
        state.isError = action.error.message ?? 'Unknown error';
      })

      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.isLoadingUpcoming = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action:PayloadAction<MoviesResponse>) => {
        const {results, total_pages, total_results} = action.payload;
        state.isLoadingUpcoming = false;
        state.upcomingMovies.movies = [...state.upcomingMovies.movies, ...results];
        state.upcomingMovies.total_pages = total_pages;
        state.upcomingMovies.total_results = total_results;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.isLoadingUpcoming = false;
        state.isError = action.error.message ?? 'Unknown error';
      });
  },
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTHORIZATION}`,
  },
};

// Async thunk to fetch popular movies
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async ({page = 1}:MoviePage) => {
    try {
      const endpoint = `${BASE_URL}/movie/popular?language=en-US&page=${page}`;
      const response = await fetch(endpoint, options);
      const data = await response.json(); 
      return data ;
    } catch (err) {
      console.log(err);
    }
  }
);

// Async thunk to fetch popular movies
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    try {
      const endpoint = `${BASE_URL}/trending/movie/day?language=en-US`;
      const response = await fetch(endpoint, options);
      const data = await response.json();
      return data.results; // payload : return tredning movies array 
    } catch (err) {
      console.log(err);
    }
  }
);

// Async thunk to fetch upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async ({page = 1}:MoviePage) => {
    try {
      const endpoint = `${BASE_URL}/movie/upcoming?language=en-US&page=${page}`;
      const response = await fetch(endpoint, options);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// Action creators are generated for each case reducer function
export const {
    setCurrentPage
} = moviesSlice.actions;

export default moviesSlice.reducer;
