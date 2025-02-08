'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from 'src/utils/classes';

type Props = {
	value: boolean;
	onChange: (value: boolean) => void;
	id?: string;
};

export function Checkbox(props: Props) {
	return (
		<CheckboxPrimitive.Root
			id={props.id}
			checked={props.value}
			onCheckedChange={props.onChange}
			className={cn(
				'transition-all h-4 w-4 shrink-0 rounded-[4px] border border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-700 data-[state=checked]:text-white',
			)}
		>
			<CheckboxPrimitive.Indicator
				className={cn('flex items-center justify-center text-current')}
			>
				<Check className="h-4 w-4" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}
