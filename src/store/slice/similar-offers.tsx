import type {OfferCard, StateOffers} from '../../types/types-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchSimilarOffersAction } from '../../services/thunk/fetch-similar-offers';

const initialState: StateOffers = {
  similarOffers: [],
};

const similarOffersSlice = createSlice({
  name: 'similarOffers',
  initialState,
  reducers: {
    addOfferList(state, action: PayloadAction<OfferCard[]>) {
      state.similarOffers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarOffersAction.fulfilled, (state, action) => {
        state.similarOffers = action.payload;
      });
  }
});

export {similarOffersSlice};
