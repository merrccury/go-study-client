import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import eventTableReducer from '../features/eventTable/eventTableSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    calendar: calendarReducer,
    dashboard: dashboardReducer,
    eventTable: eventTableReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
