import cartReducer from './index';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: cartReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;