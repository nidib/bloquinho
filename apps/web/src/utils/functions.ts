import debounce from 'lodash/debounce';

// biome-ignore lint/suspicious/noExplicitAny: we need any here
export function asyncDebounce<T extends (...args: any) => any>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	const debounced = debounce((resolve, reject, args) => {
		func(...args)
			.then(resolve)
			.catch(reject);
	}, wait);

	return (...args: Parameters<T>) => {
		return new Promise((resolve, reject) => {
			debounced(resolve, reject, args);
		});
	};
}
