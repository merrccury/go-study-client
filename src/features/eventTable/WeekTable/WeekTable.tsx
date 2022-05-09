import React, { UIEvent, useEffect, useRef, useState } from 'react';
import style from './WeekTable.module.css';
import { useAppSelector } from '../../../app/hooks';
import { selectDashboardViewMode } from '../../dashboard/dashboardSlice';
import { selectTargetDay } from '../eventTableSlice';
import moment, { Moment } from 'moment';
import { Grid } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { isAllOf } from '@reduxjs/toolkit';
import { generateClasses, range } from '../../../helpers/utils';

const getWeek = (date: Moment): Array<Moment> => {
  const weekStart = date.clone().startOf('week');
  const days: Array<Moment> = [];
  for (let i = 0; i <= 6; i++) {
    const weekDay = moment(weekStart).add(i, 'days');
    days.push(weekDay);
  }
  return days;
};
const MIN_HEIGHT = 100;

export const WeekTable = () => {
  function generateHourLine() {
    const items: Array<string> = [];
    new Array(24).fill(0).forEach((acc, index) => {
      items.push(moment({ hour: index }).format('h'));
    });

    return items.map((item) => {
      return (
        <div
          key={uuid()}
          style={{ minHeight: `${MIN_HEIGHT + 1}px` }}
          className={generateClasses(style['cell'])}>
          <span className={generateClasses('noselect')}>{item} PM</span>
        </div>
      );
    });
  }

  const [scrollTop, setScrollTop] = useState<number>(0);

  const refRightTimeBar = useRef<HTMLDivElement>(null);
  const refLeftTimeBar = useRef<HTMLDivElement>(null);
  const refEventTable = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refRightTimeBar.current && refRightTimeBar.current.scrollTop !== scrollTop) {
      refRightTimeBar.current.scrollTop = scrollTop;
    }
    if (refEventTable.current && refEventTable.current.scrollTop !== scrollTop) {
      refEventTable.current.scrollTop = scrollTop;
    }
    if (refLeftTimeBar.current && refLeftTimeBar.current.scrollTop !== scrollTop) {
      refLeftTimeBar.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const [mouseLeftOver, setMouseLeftOver] = useState<boolean>(false);
  const [mouseRightOver, setMouseRightOver] = useState<boolean>(false);

  const onScrollEvent = (event: UIEvent<HTMLDivElement>) => {
    if (
      event.currentTarget.id === RIGHT_SCROLL_DIV &&
      refLeftTimeBar.current &&
      refEventTable.current &&
      mouseRightOver
    ) {
      refLeftTimeBar.current.scrollTop = event.currentTarget.scrollTop;
      refEventTable.current.scrollTop = event.currentTarget.scrollTop;
    }
    if (
      event.currentTarget.id === LEFT_SCROLL_DIV &&
      refRightTimeBar.current &&
      refEventTable.current &&
      mouseLeftOver
    ) {
      refRightTimeBar.current.scrollTop = event.currentTarget.scrollTop;
      refEventTable.current.scrollTop = event.currentTarget.scrollTop;
    }
    if (
      event.currentTarget.id === EVENT_TABLE_SCROLL_DIV &&
      refRightTimeBar.current &&
      refLeftTimeBar.current &&
      mouseLeftOver
    ) {
      refRightTimeBar.current.scrollTop = event.currentTarget.scrollTop;
      refLeftTimeBar.current.scrollTop = event.currentTarget.scrollTop;
    }
  };
  const targetDay = useAppSelector(selectTargetDay);

  const targetWeek = getWeek(moment(targetDay));

  let monthTransient = false;

  const getFormat = () => {
    monthTransient = true;
    return 'D MMMM';
  };

  const LEFT_SCROLL_DIV = 'leftScrollDiv';
  const RIGHT_SCROLL_DIV = 'rightScrollDiv';
  const EVENT_TABLE_SCROLL_DIV = 'eventTableScrollDiv';

  return (
    <Grid container columns={14}>
      <Grid item display={'flex'} direction={'column'} xs={1}>
        <h3>{targetWeek[0].format('MMMM')}</h3>
        <div
          onMouseOver={() => setMouseLeftOver(true)}
          onMouseDown={() => setMouseLeftOver(false)}
          onTouchStart={() => setMouseLeftOver(true)}
          onTouchMove={() => setMouseLeftOver(true)}
          onTouchEnd={() => setMouseLeftOver(false)}
          onTouchMoveCapture={() => setMouseLeftOver(true)}
          onTouchStartCapture={() => setMouseLeftOver(true)}
          onTouchCancel={() => setMouseLeftOver(false)}
          onTouchCancelCapture={() => setMouseLeftOver(false)}
          id={LEFT_SCROLL_DIV}
          ref={refLeftTimeBar}
          onScroll={onScrollEvent}
          className={generateClasses(style['hour-table'], style['hour-table-left'])}>
          {generateHourLine()}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction={'row'} className={style['event-table']}>
          <Grid container columns={7}>
            {targetWeek.map((day, index) => {
              return (
                <Grid item xs={1} key={uuid()}>
                  <div
                    className={generateClasses(
                      style['day-header'],
                      index === 6 ? style['last-cell'] : '',
                      'noselect',
                      day.isSame(moment(), 'day') ? style['is-today'] : ''
                    )}>
                    <span className={style['day-header-title']}> {day.format('ddd')}</span>
                    <span className={style['day-header-number']}>
                      {day.format(
                        targetWeek[0].month() !== day.month() && !monthTransient ? getFormat() : 'D'
                      )}
                    </span>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            container
            id={EVENT_TABLE_SCROLL_DIV}
            ref={refEventTable}
            onScroll={onScrollEvent}
            className={style['event-table']}
            columns={7}>
            {Array.from(range(0, 24)).map((i) => {
              return Array.from(range(0, 6)).map((item) => {
                return (
                  <Grid item xs={1} key={uuid()}>
                    <div
                      style={{ minHeight: MIN_HEIGHT }}
                      className={generateClasses(
                        style['event-cell'],
                        item === 6 ? style['last-cell'] : '',
                        'noselect'
                      )}></div>
                  </Grid>
                );
              });
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <h3>{targetWeek[0].format('MMMM')}</h3>
        <div
          onMouseOver={() => setMouseRightOver(true)}
          onMouseDown={() => setMouseRightOver(false)}
          id={RIGHT_SCROLL_DIV}
          ref={refRightTimeBar}
          onScroll={onScrollEvent}
          style={{ minHeight: `${MIN_HEIGHT}px` }}
          className={generateClasses(style['hour-table'], style['hour-table-right'])}>
          {generateHourLine()}
        </div>
      </Grid>
    </Grid>
  );
};
