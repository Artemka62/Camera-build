import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/type-service';
import { OfferCard } from '../../type/type-store';

const fetchOffersAction = createAsyncThunk<OfferCard[], undefined, Thunk>(
  'offers/fetch',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    return data;
  },
);

export{fetchOffersAction};
