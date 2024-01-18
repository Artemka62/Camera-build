import type {OfferPromo} from '../../types/types-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchPromoOffersAction } from '../../services/thunk/fetch-promo-offers';


type StateOffers = {
  offers: OfferPromo[];
}

const initialState: StateOffers = {
  offers: [],
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
      });
  }
});

export {offersPromoSlice};

