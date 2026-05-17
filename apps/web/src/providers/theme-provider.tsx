'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import { useDarkmode } from 'src/hooks/use-darkmode';

type ThemeContextValue = {
	isDark: boolean;
	toggle: () => void;
	setTheme: (theme: 'dark' | 'light') => void;
};

const ThemeContext = createContext<null | ThemeContextValue>(null);

type Props = {
	children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
	const { isDark, toggle, setTheme } = useDarkmode();
	const value = useMemo(() => ({ isDark, toggle, setTheme }), [isDark, toggle, setTheme]);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);

	if (!ctx) {
		throw new Error(`useTheme requires the provider: ${ThemeProvider.name}`);
	}

	return ctx;
}
