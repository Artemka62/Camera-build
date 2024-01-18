import type {OfferCard} from '../../types/types-store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchOffersAction } from '../../services/thunk/fetch-offers';


type StateOffers = {
  offers: OfferCard[];
}

const initialState: StateOffers = {
  offers: [],
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
      });
  }
});

export {offersSlice};

