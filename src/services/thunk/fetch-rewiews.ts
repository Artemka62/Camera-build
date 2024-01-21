import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../const';
import { Thunk } from '../../types/types-service';
import { Reviews } from '../../types/types-store';

const fetchReviewsAction = createAsyncThunk<Reviews[], number, Thunk>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Reviews[]>(`${ApiRoute.Offers}/${id}/reviews`);

    return data;
  },
);

export{fetchReviewsAction};
