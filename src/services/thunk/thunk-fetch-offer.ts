import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../types/types-service';
import { OfferCard } from '../../types/types-store';

const fetchOfferAction = createAsyncThunk<OfferCard, number, Thunk>(
  'data/fetchOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<OfferCard>(`${ApiRoute.Offers}/${id}`);

    return data;
  },
);

export{fetchOfferAction};
