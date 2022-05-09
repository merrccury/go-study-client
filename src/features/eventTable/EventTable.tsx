import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectDashboardViewMode } from '../dashboard/dashboardSlice';
import { ViewModeType } from '../../enums';
import { WeekTable } from './WeekTable/WeekTable';

export const EventTable = () => {
  const viewMode = useAppSelector(selectDashboardViewMode);

  const project = () => {
    switch (viewMode) {
      case ViewModeType.Day:
        return <h1>Day</h1>;
      case ViewModeType.Week:
        return <WeekTable />;
      case ViewModeType.Month:
        return <h1>Month</h1>;
      case ViewModeType.Year:
        return <h1>Year</h1>;

      default:
        return <h1>Week</h1>;
    }
  };

  return <>{project()}</>;
};
