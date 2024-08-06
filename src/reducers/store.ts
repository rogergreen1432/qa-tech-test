import { Action, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createStore from './createStore';

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type AppDispatch = <T>(mThunk: AppThunk<T>) => ReturnType<typeof mThunk>;
export const useAppDispatch = useDispatch as () => AppDispatch;