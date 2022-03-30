import { createContext } from 'preact';
import { useCallback, useLayoutEffect, useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import './ColorModeProvider.module.css';
import { doNothing } from '../../helpers/helpers';

const COLOR_SWITCH_TIME_MS = 1000;

interface ColorModeContext {
  isDark: boolean;
  toggleColorMode: () => void;
}

export const ColorMode = createContext<ColorModeContext>({
  isDark: false,
  toggleColorMode: doNothing,
});

// During server-side-rendering, window cannot be accessed
const isSSR = typeof window === 'undefined';

export const ColorModeProvider = ({ children }: { children: JSXInternal.Element }) => {
  const [isDark, setIsDark] = useState<boolean>(() =>
    isSSR ? false : window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useLayoutEffect(() => {
    document.body.setAttribute('data-changing-color-mode', 'changing');
    document.body.setAttribute('data-color-mode', isDark ? 'dark' : 'light');
    const timeout = setTimeout(
      () => document.body.removeAttribute('data-changing-color-mode'),
      COLOR_SWITCH_TIME_MS
    );
    return () => clearTimeout(timeout);
  }, [isDark]);

  const toggleColorMode = useCallback(() => setIsDark((theme) => !theme), []);

  return <ColorMode.Provider value={{ isDark, toggleColorMode }}>{children}</ColorMode.Provider>;
};
