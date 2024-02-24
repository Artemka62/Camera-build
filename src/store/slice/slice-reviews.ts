import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { Review, StateReviews } from '../../types/types-store';
import { fetchReviewsAction } from '../../services/thunk/thunk-fetch-reviews';

const initialState: StateReviews = {
  reviews: [],
  error: false,
  loading: false
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reviewList(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {reviewsSlice };
