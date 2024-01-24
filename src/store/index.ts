import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { createApi } from '../services/api';
import { offersPromoSlice } from './slice/offers-promo';
import { offerSlice } from './slice/offer';
import { windowsSlice } from './slice/modal-windows';
import { similarOffersSlice } from './slice/similar-offers';
import { reviewsSlice } from './slice/reviews';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offersPromoSlice.name]: offersPromoSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [windowsSlice.name]: windowsSlice.reducer,
  [similarOffersSlice.name]: similarOffersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer
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
