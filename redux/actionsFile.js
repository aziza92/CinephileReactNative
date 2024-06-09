import {createSlice} from '@reduxjs/toolkit';

export const actionsFile = createSlice({
  name: 'actions',
  initialState: {
    action: '',
    name: '',
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    openMenu: (state) => {
      state.action = 'openMenu';
    },
    closeMenu: (state) => {
      state.action = 'closeMenu';
    },
    openLogin: (state) => {
      state.action = 'openLogin';
    },
    closeLogin: (state) => {
      state.action = 'closeLogin';
    },
    openNotif: (state) => {
      state.action = 'openNotif';
    },
    closeNotif: (state) => {
      state.action = 'closeNotif';
    },
    openCard: (state) => {
      state.action = 'openCard';
    },
    closeCard: (state) => {
      state.action = 'closeCard';
    },
  },
});

export const {
  updateName,
  openMenu,
  closeMenu,
  openLogin,
  closeLogin,
  openNotif,
  closeNotif,
  openCard,
  closeCard,
} = actionsFile.actions;

export default actionsFile.reducer;
