import React from 'react';
import style from './Calendar.module.css';
import { nextMonth, previousMonth, selectTargetDate } from './calendarSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { buildMonthCalendar } from '../../helpers/calendar-builder';
import Grid from '@mui/material/Grid';
import { generateClasses } from '../../helpers/utils';

export const Calendar = () => {
  const targetDate = useAppSelector(selectTargetDate);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={style['calendar-header']}>
        <div className={style['block']}>
          <span
            className={`${style['target-month']} ${style['general-font-properties']} ${style['not-select']}`}>
            {moment(targetDate).format('MMMM')}
          </span>
          <span
            className={`${style['target-year']} ${style['general-font-properties']} ${style['not-select']}`}>
            {' '}
            {moment(targetDate).format('YYYY')}
          </span>
        </div>
        <div className={style['block']}>
          <button onClick={() => dispatch(previousMonth())} className={style['button-arrow']}>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.24841 0.351588C7.47338 0.576621 7.59975 0.881791 7.59975 1.19999C7.59975 1.51818 7.47338 1.82335 7.24841 2.04839L3.29681 5.99999L7.24841 9.95159C7.467 10.1779 7.58795 10.481 7.58522 10.7957C7.58248 11.1103 7.45628 11.4113 7.23379 11.6338C7.0113 11.8563 6.71033 11.9825 6.39569 11.9852C6.08106 11.9879 5.77793 11.867 5.55161 11.6484L0.751612 6.84839C0.526647 6.62335 0.400269 6.31819 0.400269 5.99999C0.400269 5.68179 0.526647 5.37662 0.751612 5.15159L5.55161 0.351588C5.77664 0.126623 6.08181 0.000244141 6.40001 0.000244141C6.71821 0.000244141 7.02338 0.126623 7.24841 0.351588V0.351588Z"
                fill="white"
              />
            </svg>
          </button>
          <button onClick={() => dispatch(nextMonth())} className={style['button-arrow']}>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.751612 11.6484C0.526647 11.4234 0.400269 11.1182 0.400269 10.8C0.400269 10.4818 0.526647 10.1766 0.751612 9.95159L4.70321 5.99999L0.751612 2.04839C0.533023 1.82207 0.412069 1.51895 0.414803 1.20431C0.417537 0.889677 0.54374 0.588702 0.76623 0.366212C0.98872 0.143722 1.28969 0.0175195 1.60433 0.0147854C1.91897 0.0120513 2.22209 0.133005 2.44841 0.351595L7.24841 5.15159C7.47338 5.37663 7.59975 5.6818 7.59975 5.99999C7.59975 6.31819 7.47338 6.62336 7.24841 6.84839L2.44841 11.6484C2.22338 11.8734 1.91821 11.9997 1.60001 11.9997C1.28181 11.9997 0.976646 11.8734 0.751612 11.6484Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <Grid
        container
        style={{ width: '85%', marginLeft: '10px', marginTop: '15px' }}
        className={style['calendar-table']}
        direction={'row'}
        columns={7}>
        {moment.weekdays(true).map((dayTitle) => (
          <Grid
            item
            alignItems={'center'}
            justifyContent={'center'}
            xs={1}
            className={`${style['calendar-row']} ${style['not-select']}`}
            key={uuid()}>
            <span>{dayTitle.substring(0, 3).toUpperCase()}</span>
          </Grid>
        ))}

        {buildMonthCalendar(moment(targetDate)).map((week) => {
          return week.days.map(({ day, isCurrent, isToday }) => {
            return (
              <Grid
                item
                xs={1}
                className={generateClasses(
                  style['calendar-row'],
                  style['not-select'],
                  isCurrent ? style['current-day'] : ''
                )}
                key={uuid()}>
                <span className={isToday ? style['is-today'] : style['is-not-today']} />
                <span>{day.format('D')}</span>
              </Grid>
            );
          });
        })}
      </Grid>
    </div>
  );
};
