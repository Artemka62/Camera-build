import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { offersSlice } from './slice/offers';
import { createApi } from '../services/api';
import { offersPromoSlice } from './slice/offersPromo';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offersPromoSlice.name]: offersPromoSlice.reducer
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
