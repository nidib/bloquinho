import clsx from 'clsx';
import { ReactNode } from 'react';

type Props<T extends string> = {
	id: string;
	title: string;
	children: ReactNode;
	selectedValue: T | null;
	defaultValue?: T;
	onChange: (value: T) => void;
};

export function Select<T extends string>(props: Props<T>) {
	const { id, title, defaultValue, selectedValue, onChange, children } = props;

	return (
		<div>
			<label className="font-mono cursor-pointer" htmlFor={id}>
				{title}
			</label>
			<select
				className={clsx([
					'text-zinc-700',
					'px-2',
					'py-0.5',
					'ring-1',
					'ring-zinc-200',
					'focus-visible:ring-zinc-300',
					'shadow-sm',
					'rounded',
					'font-mono',
					'cursor-pointer',
					'outline-none',
					'min-w-[60px]',
				])}
				id={id}
				value={selectedValue ?? defaultValue}
				onChange={(e) => onChange(e.target.value as T)}
			>
				{children}
			</select>
		</div>
	);
}

Select.Option = Option;

function Option(props: { children: ReactNode; value: string }) {
	const { value, children } = props;

	return <option value={value}>{children}</option>;
}
