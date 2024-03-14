import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createApi } from '../services/index';
import { State } from './store';

 type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createApi>,
  Action
>;

export type { AppThunkDispatch };
