import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/index';
import { OfferCard } from '../../type/index';

const fetchOfferAction = createAsyncThunk<OfferCard, number, Thunk>(
  'offer/fetch',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferCard>(`${ApiRoute.Offers}/${id}`);

    return data;
  },
);

export{fetchOfferAction};
