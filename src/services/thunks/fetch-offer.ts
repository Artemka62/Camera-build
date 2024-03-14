import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/type-service';
import { OfferCard } from '../../type/type-store';

const fetchOfferAction = createAsyncThunk<OfferCard, number, Thunk>(
  'offer/fetch',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferCard>(`${ApiRoute.Offers}/${id}`);

    return data;
  },
);

export{fetchOfferAction};
