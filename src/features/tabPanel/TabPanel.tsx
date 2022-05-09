import React, { CSSProperties } from 'react';
import { createTheme, styled, ThemeProvider, useMediaQuery } from '@mui/material';
import { TabsListUnstyled, TabsUnstyled, TabUnstyled } from '@mui/base';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDashboardViewMode, setViewMode } from '../dashboard/dashboardSlice';
import { v4 as uuid } from 'uuid';
import { ViewModeType } from '../../enums';

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  display: flex;
`
);

const Tab = styled(TabUnstyled)(
  ({ theme }) => `
  all: unset;
  cursor: pointer;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #71717A;
  height: 28px;
  width: 70px;
  text-align: center;
  z-index: 2;
  transition: color 0.1s ease-in;
`
);

const Glider = styled('span')(
  ({ theme }) => `
  position: absolute;
  display: flex;
  height: 28px;
  width: 70px;
  background: #DC2626;
  border-radius: 8px;
  z-index: 1;
  transition: 0.25s ease-out;
  `
);

export const TabPanel = () => {
  const dispatch = useAppDispatch();

  const viewMode = useAppSelector(selectDashboardViewMode);

  const onChangeViewMode = (mode: number) => dispatch(setViewMode(mode));

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#DC2626',
            light: '#DC2626',
            dark: '#FF2849'
          }
        }
      }),
    [prefersDarkMode]
  );

  const getColor = (value: number): CSSProperties => {
    return { color: viewMode === value ? 'white' : '' };
  };

  const handleChange = (event: React.SyntheticEvent, value: number | string) => {
    const targetTab = typeof value === 'number' ? value : parseInt(value, 10);
    onChangeViewMode(targetTab);
  };

  return (
    <TabsUnstyled value={viewMode}>
      <TabsList>
        <Tab value={ViewModeType.Day} style={getColor(ViewModeType.Day)} onChange={handleChange}>
          Day
        </Tab>
        <Tab value={ViewModeType.Week} style={getColor(ViewModeType.Week)} onChange={handleChange}>
          Week
        </Tab>
        <Tab
          value={ViewModeType.Month}
          style={getColor(ViewModeType.Month)}
          onChange={handleChange}>
          Month
        </Tab>
        <Tab value={ViewModeType.Year} style={getColor(ViewModeType.Year)} onChange={handleChange}>
          Year
        </Tab>
        <Glider
          style={{
            transform: `translateX(${100 * viewMode}%)`
          }}
        />
      </TabsList>
    </TabsUnstyled>
  );
};
