
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { OfferCard, StateOffer } from '../../types/types-store';
import { fetchOfferAction } from '../../services/thunk/thunk-fetch-offer';

const initialState: StateOffer = {
  offer: null,
  error: false,
  loading : false
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    questionList(state, action: PayloadAction<OfferCard>) {
      state.offer = action.payload;
    },
    error(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
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
