import { AUTHORIZATION, BASE_URL } from '@/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';



interface SearchState {
    isLoading : boolean,
    error: string | null,
    searchResults: [],
    searchValue: string
}

const initialState : SearchState = {
    isLoading: false,
    error: null,
    searchResults: [],
    searchValue: '',
  };

const searchMovieSlice = createSlice({
    name: 'searchMovies',
    initialState,
    reducers: {
      setSearchedValue: (state, action: PayloadAction<string>) => {
        state.searchValue = action.payload;
      },
      clearSearchResults: (state) => {
        if(state.searchValue == '') {
          state.searchResults = [];
        }
      }
    },
    extraReducers: (builder) => {
      // async api reducers

      builder
      .addCase(fetchMovieBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieBySearch.fulfilled, (state, action)  => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchMovieBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })


    },
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTHORIZATION}`,
    },
  };

export const fetchMovieBySearch = createAsyncThunk(
  'movies/search',
  async (value: string) => {
    try {
      const endpoint = `${BASE_URL}/search/movie?query=${value}&include_adult=false&language=en-US&page=${1}`;
      const response = await fetch(endpoint, options);
      const data = await response.json();
      return data; // return searched movies
    } catch (err) {
      console.log(err);
    }
  }
)



  
// Action creators are generated for each case reducer function
export const {
    setSearchedValue , clearSearchResults
} = searchMovieSlice.actions;

export default searchMovieSlice.reducer;
  