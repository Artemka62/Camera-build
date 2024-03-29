import type {OfferCard, StateOffers} from '../../types/index';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchOffersAction } from '../../services/thunks/index';

const initialState: StateOffers = {
  offers: [],
  error: false,
  loading: false
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    addOfferList(state, action: PayloadAction<OfferCard[]>) {
      state.offers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {offersSlice};

