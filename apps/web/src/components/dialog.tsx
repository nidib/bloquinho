'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from 'src/utils/classes';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = ComponentPropsWithoutRef<
	typeof DialogPrimitive.Overlay
>;
function DialogOverlay({ className, ...props }: DialogOverlayProps) {
	return (
		<DialogPrimitive.Overlay
			className={cn(
				'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				className,
			)}
			{...props}
		/>
	);
}

type DialogContentProps = ComponentPropsWithoutRef<
	typeof DialogPrimitive.Content
>;
function DialogContent({ className, children, ...props }: DialogContentProps) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				className={cn(
					'fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-md sm:rounded-lg',
					className,
				)}
				{...props}
			>
				{children}
				<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm ring-offset-white transition-opacity focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 disabled:pointer-events-none">
					<X className="h-4 w-4 hover:opacity-70" />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
function DialogHeader({ className, ...props }: DialogHeaderProps) {
	return (
		<div
			className={cn(
				'flex flex-col space-y-1.5 text-center sm:text-left',
				className,
			)}
			{...props}
		/>
	);
}

type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
function DialogFooter({ className, ...props }: DialogFooterProps) {
	return (
		<div
			className={cn(
				'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
				className,
			)}
			{...props}
		/>
	);
}

type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
function DialogTitle({ className, ...props }: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			className={cn(
				'text-lg font-semibold leading-none tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}

type DialogDescriptionProps = ComponentPropsWithoutRef<
	typeof DialogPrimitive.Description
>;
function DialogDescription({ className, ...props }: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			className={cn('text-sm text-black/80', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
