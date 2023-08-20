import { useEffect } from 'react';

export function useCommandS(callback: CallableFunction) {
	useEffect(() => {
		const handleSavingFromKeyboard = (e: KeyboardEvent) => {
			const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;
			const isSPressed = e.key === 's';

			if (!isCtrlOrCmdPressed || !isSPressed) {
				return;
			}

			e.preventDefault();
			callback();
		};

		document.addEventListener('keydown', handleSavingFromKeyboard);

		return () => {
			document.removeEventListener('keydown', handleSavingFromKeyboard);
		};
	}, [callback]);
}
