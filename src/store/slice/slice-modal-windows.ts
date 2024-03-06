
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { StateWindow } from '../../types/types-store';

const initialState: StateWindow = {
  isWindowModalOpen: false,
  isWindowProductOpen: false,
  isWindowReviewOpen: false,
  isWindowReviewSuccessOpen: false,
  isWindowAddBasketSuccessOpen: false,
  isWindowDeleteBasketOpen : false
};

const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    isModalWindow(state, action: PayloadAction<boolean>) {
      state.isWindowModalOpen = action.payload;
    },
    windowProduct(state, action: PayloadAction<boolean>) {
      state.isWindowProductOpen = action.payload;
    },
    windowReview(state, action: PayloadAction<boolean>) {
      state.isWindowReviewOpen = action.payload;
    },
    windowReviewSuccess(state, action: PayloadAction<boolean>) {
      state.isWindowReviewSuccessOpen = action.payload;
    },
    windowAddBasketSuccess(state, action: PayloadAction<boolean>) {
      state.isWindowAddBasketSuccessOpen = action.payload;
    },
    windowDeleteBasket(state, action: PayloadAction<boolean>) {
      state.isWindowDeleteBasketOpen = action.payload;
    }

  }
});

export {windowsSlice};
