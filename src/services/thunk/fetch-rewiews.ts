import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { Thunk } from '../../types/types-service';
import { Review } from '../../types/types-store';

const fetchReviewsAction = createAsyncThunk<Review[], number, Thunk>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Offers}/${id}/reviews`);

    return data;
  },
);

export{fetchReviewsAction};
