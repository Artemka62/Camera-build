import { AxiosInstance } from 'axios';
import { AppDispatch, State } from './types-store';

type Thunk = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export type {Thunk};
