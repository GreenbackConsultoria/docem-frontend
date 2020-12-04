import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles'

import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#11323c",
    },
    secondary: {
      main: "#F15A22",
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
