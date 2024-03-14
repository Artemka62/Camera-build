import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/index';
import { OfferPromo } from '../../type/index';

const fetchPromoOffersAction = createAsyncThunk<OfferPromo[], undefined, Thunk>(
  'promoOffers/fetch',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<OfferPromo[]>(ApiRoute.OffersPromo);

    return data;
  },
);

export{fetchPromoOffersAction};
