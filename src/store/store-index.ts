import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slice/slice-offers';
import { createApi } from '../services/services-api';
import { offersPromoSlice } from './slice/slice-offers-promo';
import { offerSlice } from './slice/slice-offer';
import { windowsSlice } from './slice/slice-modal-windows';
import { similarOffersSlice } from './slice/slice-similar-offers';
import { reviewsSlice } from './slice/slice-reviews';
import { offersBasketSlice } from './slice/slice-basket-offers';
import { couponSlice } from './slice/slice-coupon';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offersPromoSlice.name]: offersPromoSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [windowsSlice.name]: windowsSlice.reducer,
  [similarOffersSlice.name]: similarOffersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [offersBasketSlice.name]: offersBasketSlice.reducer,
  [couponSlice.name]: couponSlice.reducer
});

const api = createApi();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export {store, reducer};
