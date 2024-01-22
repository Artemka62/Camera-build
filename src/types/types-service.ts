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

export type {Thunk, PostReview};
