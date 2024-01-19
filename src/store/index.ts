import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { createApi } from '../services/api';
import { offersPromoSlice } from './slice/offersPromo';
import { offerSlice } from './slice/offer';
import { windowSlice } from './slice/modalWindow';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offersPromoSlice.name]: offersPromoSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [windowSlice.name]: windowSlice.reducer
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
