import { AUTHORIZATION, BASE_URL } from '@/constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface movieDetailsProps {
        movieDetails: {
            credits : {}
        };
        isLoading: boolean;
        isError: boolean | string;
    }

const initialState: movieDetailsProps = {
    movieDetails : {
        credits : {}
    },
    isLoading: false,
    isError: false,
  };

const movieDetailSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // async api reducers

      builder
      .addCase(fetchMovieDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetailsById.fulfilled, (state, action)  => {
        state.isLoading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message ?? 'Unknown error';
      })

      builder
      .addCase(fetchMovieCreditsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieCreditsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieDetails = {
            ...state.movieDetails,
            credits : action.payload
        }
      })
      .addCase(fetchMovieCreditsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message ?? 'Unknown error';
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

export const fetchMovieDetailsById = createAsyncThunk(
  'movieDetails/fetchMovieDetailsById',
  async (movie_id: string) => {
    try {
      const endpoint = `${BASE_URL}/movie/${movie_id}?language=en-US`;
      const response = await fetch(endpoint, options);
      const data = await response.json();
      return data; // return movie details
    } catch (err) {
      console.log(err);
    }
  }
)


export const fetchMovieCreditsById = createAsyncThunk(
    'movieDetails/fetchMovieCredits',
    async (movie_id: string) => {
      try {
        const endpoint = `${BASE_URL}/movie/${movie_id}/credits?language=en-US`;
        const response = await fetch(endpoint, options);
        const data = await response.json();
        return data; // return movie credits
      } catch (err) {
        console.log(err);
      }
    }
  )


  
// Action creators are generated for each case reducer function
export const {

} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
  