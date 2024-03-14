import type {OfferPromo, StateOffersPromo} from '../../type/type-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchPromoOffersAction } from '../../services/thunks/index';

const initialState: StateOffersPromo = {
  offers: [],
  error: false,
  loading: false
};

const offersPromoSlice = createSlice({
  name: 'offersPromo',
  initialState,
  reducers: {
    addOfferList(state, action: PayloadAction<OfferPromo[]>) {
      state.offers = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchPromoOffersAction.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchPromoOffersAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {offersPromoSlice};

