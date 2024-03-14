import {createAsyncThunk} from '@reduxjs/toolkit';
import { ApiRoute } from '../../src-const';
import { DataPostOrder, Thunk } from '../../type/index';

const postOrder = createAsyncThunk<void, DataPostOrder , Thunk>(
  'order/post',
  async (order, {extra: api}) => {
    await api.post(`${ApiRoute.Order}`, order);
  },
);

export {postOrder};
