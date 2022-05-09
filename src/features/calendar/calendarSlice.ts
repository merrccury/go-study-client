import moment, { Moment } from 'moment';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CalendarState {
  currentDate: number;
  targetDate: number;
}

const initialState: CalendarState = {
  currentDate: moment().valueOf(),
  targetDate: moment().valueOf()
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextMonth: (state) => {
      state.targetDate = moment(state.targetDate).clone().add(1, 'M').valueOf();
    },
    previousMonth: (state) => {
      state.targetDate = moment(state.targetDate).clone().subtract(1, 'M').valueOf();
    },
    setTargetDate: (state) => {
      state.targetDate = moment().valueOf();
    }
  }
});

export const { nextMonth, previousMonth, setTargetDate } = calendarSlice.actions;

export const selectTargetDate = (state: RootState) => state.calendar.targetDate;

export default calendarSlice.reducer;
