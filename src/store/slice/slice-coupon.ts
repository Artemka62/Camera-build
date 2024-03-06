import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { StateCoupon } from '../../types/types-store';

import { postCoupon } from '../../services/thunk/thunk-post-coupon';


const initialState: StateCoupon = {
  percent: 0,
  error: false,
  loading: false
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    reviewList(state, action: PayloadAction<number>) {
      state.percent = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCoupon.fulfilled, (state, action) => {
        state.percent = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(postCoupon.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(postCoupon.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {couponSlice};