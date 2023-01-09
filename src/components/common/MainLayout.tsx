import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Header } from './Header';

const theme = createTheme(

);

export const MainLayout = (props: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Header />
        {props.children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
