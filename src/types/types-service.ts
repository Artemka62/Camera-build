import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './types-store';

type Thunk = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

type PostReview = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type PostCoupon = {
  coupon: string;
}

type DataPostOrder = {
  camerasIds: number[];
  coupon: string | null;
}

export type {Thunk, PostReview, PostCoupon, DataPostOrder};
