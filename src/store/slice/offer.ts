
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { OfferCard, StateOffer } from '../../types/types-store';
import { fetchOfferAction } from '../../services/thunk/fetch-offer';

const initialState: StateOffer = {
  reviews: null
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
      });
  }
});

export {offerSlice};
