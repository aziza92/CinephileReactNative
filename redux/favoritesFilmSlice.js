import {createSlice} from '@reduxjs/toolkit';

const favoritesFilmSlice = createSlice({
  name: 'favorisFilm',
  initialState: [],

  reducers: {
    favFilm: (state, action) => {
      const favoriteFilmIndex = state.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (favoriteFilmIndex !== -1) {
        state.splice(favoriteFilmIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const {favFilm} = favoritesFilmSlice.actions;
export default favoritesFilmSlice.reducer;
