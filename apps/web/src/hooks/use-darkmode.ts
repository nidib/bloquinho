'use client';

import { useLocalStorage } from '@uidotdev/usehooks';
import { useCallback, useEffect } from 'react';

function getSystemTheme(): 'dark' | 'light' {
	if (typeof window === 'undefined') {
		return 'light';
	}

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
}

export function useDarkmode() {
	const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', getSystemTheme());
	const isDark = theme === 'dark';

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', isDark);
	}, [isDark]);

	const toggle = useCallback(() => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
	}, [setTheme]);

	return { isDark, toggle, setTheme };
}
