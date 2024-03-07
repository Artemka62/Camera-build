import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { Thunk } from '../../types/types-service';

type DataPostCoupon = {
  data: number;
}


const postCoupon = createAsyncThunk<number, {coupon: string} , Thunk>(
  'coupon/post',
  async (coupon, {extra: api}) => {
    const {data}: DataPostCoupon = await api.post(`${ApiRoute.Coupon}`, coupon);

    return data;
  },
);

export {postCoupon};
