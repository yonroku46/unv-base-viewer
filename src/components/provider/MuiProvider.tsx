'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = '#2563eb';
  const secondaryColor = '#6366f1';
  const background = '#ffffff';
  const foreground = '#171717';

  const theme = createTheme({
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: background,
      },
      text: {
        primary: foreground,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '0.75rem',
          },
        },
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
