import { configureStore, combineReducers } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moviesReducer from './slices/movieSlice';
import movieDetailsReducer from './slices/movieDetailsSlice';
import searchMovieReducer from './slices/searchSlice';
import favoriteMovieReducer from './slices/favoriteMovieSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favoriteMovieReducer'], // only persist favorites
};

const rootReducer = combineReducers({
  moviesReducer,
  movieDetailsReducer,
  searchMovieReducer,
  favoriteMovieReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
