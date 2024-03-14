import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApiRoute} from '../../src-const';
import { PostReview, Thunk } from '../../type/type-service';

const postReview = createAsyncThunk<void, {dataForm: PostReview} , Thunk>(
  'review/post',
  async ({dataForm}, {extra: api}) => {
    await api.post(`${ApiRoute.ReviewsProduct}`, dataForm);
  },
);

export {postReview};
