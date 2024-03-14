import { createSlice } from '@reduxjs/toolkit';
import { StateOrder } from '../../types/index';
import { postOrder } from '../../services/thunks/index';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: StateOrder = {
  error: false,
  loading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    error(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    }
  },
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
