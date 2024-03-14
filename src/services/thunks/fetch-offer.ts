import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../types/index';
import { OfferCard } from '../../types/index';

const fetchOfferAction = createAsyncThunk<OfferCard, number, Thunk>(
  'offer/fetch',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferCard>(`${ApiRoute.Offers}/${id}`);

    return data;
  },
);

export{fetchOfferAction};
