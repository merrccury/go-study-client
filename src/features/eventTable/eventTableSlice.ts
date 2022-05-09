import moment, { Moment } from 'moment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ViewModeType } from '../../enums';

export interface EventTableState {
  targetDay: number;
}

const initialState: EventTableState = {
  targetDay: moment().valueOf()
};

export const eventTableSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setTargetDay: (state, action: PayloadAction<number>) => {
      state.targetDay = action.payload;
    }
  }
});

export const { setTargetDay } = eventTableSlice.actions;

export const selectTargetDay = (state: RootState) => state.eventTable.targetDay;

export default eventTableSlice.reducer;
