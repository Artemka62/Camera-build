
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { StateWindow } from '../../types/types-store';


const initialState: StateWindow = {
  isWindowOpen: false
};

const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    isWindow(state, action: PayloadAction<boolean>) {
      state.isWindowOpen = action.payload;
    },
  }
});

export {windowSlice};
