import type {OfferCard, StateOffersSimilar} from '../../types/types-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchSimilarOffersAction } from '../../services/thunk/thunk-fetch-similar-offers';

const initialState: StateOffersSimilar = {
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
