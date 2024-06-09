import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import actionsFile from './actionsFile';
import vusReducer from './vusSlice';

import favorisFilmReducer from './favoritesFilmSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
const reducer = combineReducers({
  actions: actionsFile,
  favorisFilm: favorisFilmReducer,
  filmVus: vusReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
