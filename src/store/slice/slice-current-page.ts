
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type StateCurrentPage = {
  page: number;
}

const initialState: StateCurrentPage = {
  page: 1,
};

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    page(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  }
});

export {currentPageSlice};
