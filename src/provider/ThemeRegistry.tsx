'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import NextAppDirEmotionCacheProvider from './EmotionCache';
import QueryProviders from './QueryProvider';

import { baselightTheme } from '@/utils/theme/DefaultColors';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const currMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', currMode);

          return currMode;
        });
      },
    }),
    [],
  );

  React.useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme) {
      setMode(theme as 'light' | 'dark');
    }
  }, []);

  const theme = React.useMemo(() => baselightTheme(mode), [mode]);

  return (
    <>
      <ProgressBar
        color='#4caf50'
        options={{ showSpinner: true }}
        shallowRouting
      />

      <ColorModeContext.Provider value={colorMode}>
        <NextAppDirEmotionCacheProvider options={{ key: 'mui-datatables' }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <QueryProviders>{children}</QueryProviders>
          </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
      </ColorModeContext.Provider>
    </>
  );
}
