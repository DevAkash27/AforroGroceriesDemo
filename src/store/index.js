import {combineReducers, configureStore} from '@reduxjs/toolkit';
import HomeSlice from '../apiSlices/homeSlice';

export const RESET_STATE = 'RESET_STATE';

const reducer = combineReducers({
  home: HomeSlice,
});

const rootReducer = (state, action) => {
  return reducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
