
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { OfferCard, StateOffer } from '../../types/types-store';
import { fetchOfferAction } from '../../services/thunk/fetch-offer';

const initialState: StateOffer = {
  reviews: null,
  error: false,
  loading : false
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    questionList(state, action: PayloadAction<OfferCard>) {
      state.reviews = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {offerSlice};
