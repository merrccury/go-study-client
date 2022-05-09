import React from 'react';
import Container from '@mui/material/Container';
import { Calendar } from '../calendar/Calendar';
import moment from 'moment';

export const LeftSide = () => {
  return (
    <Container style={{ padding: 0 }} maxWidth={false} sx={{ bgcolor: '#18181B', height: '100vh' }}>
      <Calendar />
    </Container>
  );
};
