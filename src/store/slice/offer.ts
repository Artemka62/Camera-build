
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { OfferCard, StateOffer } from '../../types/types-store';
import { fetchOfferAction } from '../../services/thunk/fetch-offer';

const initialState: StateOffer = {
  offer: null
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    questionList(state, action: PayloadAction<OfferCard>) {
      state.offer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      });
  }
});

export {offerSlice};
