import { configureStore } from '@reduxjs/toolkit';
import boardingReducer from './slices/boardingSlice';

export const store = configureStore({
  reducer: {
    boarding: boardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;