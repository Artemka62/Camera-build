import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApiRoute} from '../../const';
import { PostReview, Thunk } from '../../types/types-service';

const postReview = createAsyncThunk<void, {dataForm: PostReview} , Thunk>(
  'data/postReview',
  async ({dataForm}, {extra: api}) => {
    await api.post(`${ApiRoute.ReviewsProduct}`, dataForm);
  },
);

export {postReview};
