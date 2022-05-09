import React from 'react';
import Container from '@mui/material/Container';
import { Dashboard } from '../dashboard/Dashboard';

export const RightSide = () => {
  return (
    <Container style={{ padding: 0 }} maxWidth={false} sx={{ height: '100vh' }}>
      <Dashboard />
    </Container>
  );
};
