import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { AppDispatch, State } from '../type/index';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
const useAppDispatch = useDispatch<AppDispatch>;

export {useAppSelector, useAppDispatch};
