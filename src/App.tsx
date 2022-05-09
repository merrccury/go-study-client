import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { LeftSide } from './features/leftside/LeftSide';
import { RightSide } from './features/rightside/RightSide';

function App() {
  return (
    <React.Fragment>
      <div className={''}>
        <div />
      </div>
      <Container style={{ padding: 0 }} maxWidth={false} sx={{ height: '100vh' }}>
        <Grid container>
          <Grid item xs={3}>
            <LeftSide />
          </Grid>
          <Grid item xs={9}>
            <RightSide />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
