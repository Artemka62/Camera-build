import type {OfferCard, StateOffersSimilar} from '../../types/index';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchSimilarOffersAction } from '../../services/thunks/index';

const initialState: StateOffersSimilar = {
  similarOffers: [],
  error: false,
  loading: false
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
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchSimilarOffersAction.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSimilarOffersAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {similarOffersSlice};
