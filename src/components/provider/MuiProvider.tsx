'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { Noto_Sans_JP, Noto_Sans } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
});
const notoSansEn = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
});

const fontFamily = `${notoSansJP.style.fontFamily}, ${notoSansEn.style.fontFamily}`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColor = '#2563eb';
  const secondaryColor = '#6366f1';
  const background = '#ffffff';
  const foreground = '#171717';

  const theme = createTheme({
    typography: {
      fontFamily,
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
            '@media (max-width: 1179px)': {
              borderRadius: '0',
            },
          },
          paperFullScreen: {
            borderRadius: '0',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            '@media (max-width: 1179px)': {
              minHeight: 'var(--header-height)',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '0.95rem',
            textTransform: 'none',
            color: 'rgba(30, 41, 59, 0.7)',
            '&.Mui-selected': {
              color: primaryColor,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: primaryColor,
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              '& input': {
                opacity: 0,
              },
            },
          },
        },
      },
      MuiSpeedDialAction: {
        styleOverrides: {
          fab: {
            background: foreground,
            color: background,
            '&:hover': {
              background: foreground,
              opacity: 0.8,
            },
          },
          staticTooltipLabel: {
            background: foreground,
            color: background,
            width: 'max-content',
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.MuiTabScrollButton-root.Mui-disabled': {
              opacity: 0.2,
            },
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