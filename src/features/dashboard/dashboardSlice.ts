import moment, { Moment } from 'moment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ViewModeType } from '../../enums';

export interface DashboardState {
  targetDay: number;
  viewMode: ViewModeType;
}

const initialState: DashboardState = {
  targetDay: moment().valueOf(),
  viewMode: ViewModeType.Week
};

export const dashboardSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewModeType>) => {
      state.viewMode = action.payload;
    },
    setTargetDay: (state, action: PayloadAction<number>) => {
      state.targetDay = action.payload;
    }
  }
});

export const { setViewMode, setTargetDay } = dashboardSlice.actions;

export const selectDashboardViewMode = (state: RootState) => state.dashboard.viewMode;
export const selectTargetDay = (state: RootState) => state.dashboard.targetDay;

export default dashboardSlice.reducer;
