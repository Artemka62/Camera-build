import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/type-service';
import { OfferCard } from '../../type/type-store';

const fetchSimilarOffersAction = createAsyncThunk<OfferCard[], number, Thunk>(
  'similarOffers/fetch',
  async (id, { extra: api}) => {
    const {data} = await api.get<OfferCard[]>(`${ApiRoute.Offers}/${id}${ApiRoute.Similar}`);

    return data;
  },
);

export{fetchSimilarOffersAction};
