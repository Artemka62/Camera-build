import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../type/type-service';
import { Review } from '../../type/type-store';

const fetchReviewsAction = createAsyncThunk<Review[], number, Thunk>(
  'reviews/fetch',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Offers}/${id}${ApiRoute.ReviewsProduct}`);

    return data;
  },
);

export{fetchReviewsAction};
