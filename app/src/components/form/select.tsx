'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import {
	type ComponentProps,
	type ComponentPropsWithoutRef,
	type ReactNode,
	forwardRef,
} from 'react';
import { cn } from 'src/utils/classes';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & {
	children: ReactNode;
	errorMessage?: string;
};

function SelectTrigger({
	children,
	className,
	errorMessage,
	...props
}: SelectTriggerProps) {
	return (
		<div>
			<SelectPrimitive.Trigger
				className={cn(
					'text-sm px-3 py-2 shadow-sm transition-all flex w-full items-center justify-between gap-3 rounded-md text-zinc-800 border border-zinc-200 hover:border-zinc-300 data-[state=open]:border-zinc-300 bg-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:border-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
					Boolean(errorMessage) &&
						'border-red-200 hover:border-red-300 data-[state=open]:border-red-300 focus-visible:border-red-700 focus-visible:ring-red-700',
					className,
				)}
				{...props}
			>
				{children}
				<SelectPrimitive.Icon asChild>
					<ChevronDown className="h-4 w-4 opacity-50" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>
			{Boolean(errorMessage) && (
				<span className="text-sm text-red-500">{errorMessage}</span>
			)}
		</div>
	);
}

type SelectScrollUpButtonProps = ComponentPropsWithoutRef<
	typeof SelectPrimitive.ScrollUpButton
> & {};

function SelectScrollUpButton(props: SelectScrollUpButtonProps) {
	return (
		<SelectPrimitive.ScrollUpButton
			className={cn('flex cursor-default items-center justify-center py-1')}
			{...props}
		>
			<ChevronUp className="h-4 w-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

type SelectScrollDownButtonProps = ComponentPropsWithoutRef<
	typeof SelectPrimitive.ScrollDownButton
> & {};

function SelectScrollDownButton(props: SelectScrollDownButtonProps) {
	return (
		<SelectPrimitive.ScrollDownButton
			className={cn('flex cursor-default items-center justify-center py-1')}
			{...props}
		>
			<ChevronDown className="h-4 w-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

const SelectContent = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
			)}
			position={position}
			{...props}
		>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={cn(
					'p-1',
					position === 'popper' &&
						'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
		{...props}
	/>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-zinc-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</SelectPrimitive.ItemIndicator>
		</span>

		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn('-mx-1 my-1 h-px bg-muted', className)}
		{...props}
	/>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
