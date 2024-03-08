import {createSlice} from '@reduxjs/toolkit';
import { StateOrder } from '../../types/types-store';
import { postOrder } from '../../services/thunk/thunk-post-order';

const initialState: StateOrder = {
  error: false,
  loading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrder.fulfilled, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(postOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  }
});

export {orderSlice};
