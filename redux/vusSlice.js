import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  vusFilm: [],
};

const vusSlice = createSlice({
  name: 'filmVus',
  initialState,
  reducers: {
    vus: (state, action) => {
      if (!state.vusFilm) {
        console.log('vusFilm array is undefined or null');
        return;
      }
      const vusFilmIndex = state.vusFilm.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (vusFilmIndex === -1) {
        state.vusFilm.push(action.payload);
      } else {
        state.vusFilm.splice(vusFilmIndex, 1);
      }
    },
    // deleteAllVus: (state) => {
    //   state.vusFilm = []; // Set the 'vus' array to an empty array
    // },
  },
});

export const {vus} = vusSlice.actions;

export default vusSlice.reducer;
