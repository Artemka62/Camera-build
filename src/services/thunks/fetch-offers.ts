import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../types/index';
import { OfferCard } from '../../types/index';

const fetchOffersAction = createAsyncThunk<OfferCard[], undefined, Thunk>(
  'offers/fetch',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    return data;
  },
);

export{fetchOffersAction};
