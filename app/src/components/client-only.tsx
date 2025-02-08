'use client';

import { useIsClient } from '@uidotdev/usehooks';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

/**
 * Hack to work around next.js hydration
 * @see https://github.com/uidotdev/usehooks/issues/218
 */
export function ClientOnly({ children }: Props) {
	const isClient = useIsClient();

	// Render children if on client side, otherwise return null
	return isClient ? children : null;
}
