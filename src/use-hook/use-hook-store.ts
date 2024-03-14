import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { AppDispatch, State } from '../type/type-store';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
const useAppDispatch = useDispatch<AppDispatch>;

export {useAppSelector, useAppDispatch};
