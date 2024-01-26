import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../types/types-service';
import { OfferCard } from '../../types/types-store';

const fetchSimilarOffersAction = createAsyncThunk<OfferCard[], number, Thunk>(
  'data/fetchSimilarOffers',
  async (id, { extra: api}) => {
    const {data} = await api.get<OfferCard[]>(`${ApiRoute.Offers}/${id}${ApiRoute.Similar}`);

    return data;
  },
);

export{fetchSimilarOffersAction};
