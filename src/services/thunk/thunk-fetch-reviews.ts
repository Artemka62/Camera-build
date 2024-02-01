import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../types/types-service';
import { Review } from '../../types/types-store';

const fetchReviewsAction = createAsyncThunk<Review[], number, Thunk>(
  'reviews/fetch',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Offers}/${id}${ApiRoute.ReviewsProduct}`);

    return data;
  },
);

export{fetchReviewsAction};
