
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { Reviews, StateReviews } from '../../types/types-store';

import { fetchReviewsAction } from '../../services/thunk/fetch-rewiews';

const initialState: StateReviews = {
  reviews: []
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reviewList(state, action: PayloadAction<Reviews[]>) {
      state.reviews = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export {reviewsSlice };
