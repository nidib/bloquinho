/* eslint-disable ts/no-unsafe-argument */
import debounce from 'lodash/debounce';

export function asyncDebounce<T extends (...args: any) => Promise<any>>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	const debounced = debounce((resolve, reject, args) => {
		void func(...args)
			.then(resolve)
			.catch(reject);
	}, wait);

	return (...args: Parameters<T>) => {
		return new Promise((resolve, reject) => {
			debounced(resolve, reject, args);
		});
	};
}
