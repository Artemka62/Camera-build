
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {OfferLocalStorage, StateBasket} from '../../types/index';

const initialState: StateBasket = {
  offers: []
};

const offersBasketSlice = createSlice({
  name: 'offersBasket',
  initialState,
  reducers: {
    offersBasket(state, action: PayloadAction<OfferLocalStorage[]>) {
      state.offers = action.payload;
    },
  }
});

export {offersBasketSlice};
