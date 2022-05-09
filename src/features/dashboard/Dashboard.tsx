import { Box, Grid, Tab, Tabs } from '@mui/material';
import React from 'react';
import style from './Dashboard.module.css';
import { generateClasses } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TabPanel } from '../tabPanel/TabPanel';
import { EventTable } from '../eventTable/EventTable';
import { selectDashboardViewMode, selectTargetDay, setTargetDay } from './dashboardSlice';
import { ViewModeType } from '../../enums';
import moment from 'moment';

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  const setDay = (targetDay: number) => dispatch(setTargetDay(targetDay));

  const viewMode = useAppSelector(selectDashboardViewMode);
  const targetDay = useAppSelector(selectTargetDay);

  const onPreviousClick = () => {
    switch (viewMode) {
      case ViewModeType.Week:
        return setDay(moment(targetDay).subtract(1, 'weeks').valueOf());
    }
  };

  const onNextClick = () => {
    switch (viewMode) {
      case ViewModeType.Week:
        return setDay(moment(targetDay).add(1, 'weeks').valueOf());
    }
  };

  return (
    <>
      <Grid container columns={12} padding={'15px'} direction={'row'}>
        <Grid item display={'flex'} justifyContent={'start'} xs={2}>
          <button
            onClick={onPreviousClick}
            className={generateClasses(
              style['button-today-arrow'],
              style['button-arrow-previous']
            )}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.707 0.293C5.89447 0.480528 5.99979 0.734836 5.99979 1C5.99979 1.26516 5.89447 1.51947 5.707 1.707L2.414 5L5.707 8.293C5.88916 8.4816 5.98995 8.7342 5.98767 8.9964C5.9854 9.2586 5.88023 9.50941 5.69482 9.69482C5.50941 9.88023 5.2586 9.9854 4.9964 9.98767C4.7342 9.98995 4.4816 9.88916 4.293 9.707L0.293 5.707C0.105529 5.51947 0.000213623 5.26516 0.000213623 5C0.000213623 4.73484 0.105529 4.48053 0.293 4.293L4.293 0.293C4.48053 0.105529 4.73484 0.000213623 5 0.000213623C5.26516 0.000213623 5.51947 0.105529 5.707 0.293Z"
                fill="#18181B"
              />
            </svg>
          </button>
          <button
            onClick={() => setDay(moment().valueOf())}
            className={generateClasses(style['button-today-arrow'], style['button-today'])}>
            Today
          </button>
          <button
            onClick={onNextClick}
            className={generateClasses(style['button-today-arrow'], style['button-arrow-next'])}>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.293 9.70701C0.105529 9.51948 0.000213623 9.26517 0.000213623 9.00001C0.000213623 8.73485 0.105529 8.48054 0.293 8.29301L3.586 5.00001L0.293 1.70701C0.110842 1.51841 0.0100473 1.26581 0.0123258 1.00361C0.0146042 0.741413 0.119773 0.4906 0.305182 0.305192C0.49059 0.119784 0.741402 0.0146148 1.0036 0.0123364C1.2658 0.010058 1.5184 0.110853 1.707 0.293011L5.707 4.29301C5.89447 4.48054 5.99979 4.73485 5.99979 5.00001C5.99979 5.26517 5.89447 5.51948 5.707 5.70701L1.707 9.70701C1.51947 9.89448 1.26516 9.9998 1 9.9998C0.734836 9.9998 0.480528 9.89448 0.293 9.70701Z"
                fill="#18181B"
              />
            </svg>
          </button>
        </Grid>
        <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} item xs={8}>
          <TabPanel />
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <EventTable />
    </>
  );
};
