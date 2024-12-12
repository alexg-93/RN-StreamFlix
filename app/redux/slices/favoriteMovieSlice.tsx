import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit';
import { FavoriteMoviesState} from '@/types';


const initialState : FavoriteMoviesState = {
  favorites: [],
};

const favoriteMoviesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
        // check if movie id already exisit if not exisit then add the movie.
        const movie = state.favorites.find((movie) => movie.id.toString() === action.payload.id.toString());
        if(!movie){
            state.favorites = [...state.favorites, action.payload];
        }
    },
    removeFavoriteMovie: (state, action) => {
        // remove the movie if exisit by id
        const movie = state.favorites.find((movie) => movie.id.toString() === action.payload.id.toString());
        if(movie){
            state.favorites = state.favorites.filter(movie => (movie?.id.toString() !== action.payload.id.toString()));
        }
    },
  },
  extraReducers: (builder) => {
    // handle async thunks
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;