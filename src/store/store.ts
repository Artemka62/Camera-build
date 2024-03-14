import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { offersSlice } from './slices/index';
import { createApi } from '../services/services-api';
import { offersPromoSlice } from './slices/index';
import { offerSlice } from './slices/index';
import { windowsSlice } from './slices/index';
import { similarOffersSlice } from './slices/index';
import { reviewsSlice } from './slices/index';
import { offersBasketSlice } from './slices/index';
import { couponSlice } from './slices/index';
import { orderSlice } from './slices/index';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offersPromoSlice.name]: offersPromoSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [windowsSlice.name]: windowsSlice.reducer,
  [similarOffersSlice.name]: similarOffersSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [offersBasketSlice.name]: offersBasketSlice.reducer,
  [couponSlice.name]: couponSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
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
