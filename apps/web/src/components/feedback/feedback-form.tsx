'use client';

import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
	Controller,
	FormProvider,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { toast } from 'sonner';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from 'src/components/dialog';
import { Button } from 'src/components/form/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/components/form/select';
import { Textarea } from 'src/components/form/textarea';
import { Api } from 'src/lib/client/client-api';
import type { FeedbackType } from 'src/lib/types/feedback';
import { useI18n } from 'src/providers/i18n-provider';

type FormState = {
	type: null | FeedbackType;
	message: string;
};

type Props = {
	trigger: ReactNode;
};

export function FeedbackForm(props: Props) {
	const { t } = useI18n();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const methods = useForm<FormState>({
		defaultValues: { type: null, message: '' },
	});
	const { mutate: doSubmit, isPending } = useMutation({
		mutationFn: async (formState: FormState) => {
			if (formState.type === null) {
				return;
			}

			await Api.Mail.sendFeedbackEmail(formState.type, formState.message);
		},
		onSuccess: () => {
			methods.reset();
			setIsDialogOpen(false);
			toast.success(t('YourMessageHasBeenSentThankYou'));
		},
	});

	const handleSubmit = (formState: FormState) => {
		doSubmit(formState);
	};

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				if (!open) methods.clearErrors();

				setIsDialogOpen(open);
			}}
		>
			{props.trigger}
			<DialogContent className="gap-8">
				<FormProvider {...methods}>
					<DialogHeader>
						<DialogTitle>{t('ReportBugOrSuggestion')}</DialogTitle>
						<DialogDescription>
							{t('ReportBugOrSuggestionDescription')}
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={methods.handleSubmit(handleSubmit)}
						className="flex flex-col gap-4"
					>
						<div className="w-[200px]">
							<FormTypeSelect />
						</div>
						<MessageField />
						<DialogFooter>
							<Button type="submit" disabled={isPending}>
								{isPending ? t('Sending') : t('Send')}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}

FeedbackForm.Trigger = (props: { children: ReactNode }) => {
	return <DialogTrigger asChild>{props.children}</DialogTrigger>;
};

function FormTypeSelect() {
	const { t } = useI18n();
	const { control } = useFormContext<FormState>();

	const selectOptions = useMemo(
		() => ({
			bug: t('Bug'),
			feature: t('Improvement'),
			feedback: t('Feedback'),
		}),
		[t],
	);

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor="type" className="text-sm w-fit">
				{t('Type')}
			</label>
			<Controller
				name="type"
				control={control}
				rules={{
					required: t('ThisFieldIsRequired'),
				}}
				render={({ field, fieldState }) => (
					<Select
						value={field.value ?? undefined}
						onValueChange={field.onChange}
					>
						<SelectTrigger id="type" errorMessage={fieldState.error?.message}>
							<SelectValue placeholder={t('SelectAType')} />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(selectOptions).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
		</div>
	);
}

function MessageField() {
	const { t } = useI18n();
	const { control, watch } = useFormContext<FormState>();
	const type = watch('type');

	const textarea = useMemo(() => {
		switch (type) {
			case 'bug':
				return {
					label: t('HowToReproduce'),
					placeholder: t('DescribeTheStepsToReproduce'),
				};
			case 'feature':
				return {
					label: t('WhatYouThought'),
					placeholder: t('TellMeAboutYourIdea'),
				};
			case 'feedback':
				return {
					label: t('WhatYouThought'),
					placeholder: t('TellMeMore'),
				};
			default:
				return {
					label: t('Message'),
					placeholder: t('TypeYourMessage'),
				};
		}
	}, [t, type]);

	return (
		<div className="flex-1 flex flex-col gap-1">
			<label htmlFor="content" className="text-sm w-fit">
				{textarea.label}
			</label>
			<Controller
				name="message"
				control={control}
				rules={{
					required: t('ThisFieldIsRequired'),
				}}
				render={({ field, fieldState }) => (
					<Textarea
						id="content"
						value={field.value}
						onChange={field.onChange}
						placeholder={textarea.placeholder}
						className="h-[250px] resize-none"
						errorMessage={fieldState.error?.message}
					/>
				)}
			/>
		</div>
	);
}
