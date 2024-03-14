import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/index';
import { Review } from '../../type/index';

const fetchReviewsAction = createAsyncThunk<Review[], number, Thunk>(
  'reviews/fetch',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Offers}/${id}${ApiRoute.ReviewsProduct}`);

    return data;
  },
);

export{fetchReviewsAction};
