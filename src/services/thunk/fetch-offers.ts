import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { Thunk } from '../../types/types-service';
import { OfferCard } from '../../types/types-store';

const fetchOffersAction = createAsyncThunk<OfferCard[], undefined, Thunk>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<OfferCard[]>(ApiRoute.Offers);

    return data;
  },
);

export{fetchOffersAction};
