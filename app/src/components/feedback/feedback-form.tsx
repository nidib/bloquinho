'use client';

import { useMutation } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
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

const textareaLabelByFormType: Record<
	FeedbackType,
	{ label: string; placeholder: string }
> = {
	bug: {
		label: 'Como reproduzir?',
		placeholder: 'Descreva os passos para reproduzir esse bug.',
	},
	feature: {
		label: 'No que você pensou?',
		placeholder: 'Me conta um pouco sobre essa sua ideia.',
	},
	feedback: {
		label: 'O que achou?',
		placeholder: 'Compartilhe sua opinião ou sugestão.',
	},
};

const defaultTextareaLabel = {
	label: 'Mensagem',
	placeholder: 'Descreva aqui sua mensagem.',
};

type FormState = {
	type: null | FeedbackType;
	message: string;
};

type Props = {
	trigger: ReactNode;
};

export function FeedbackForm(props: Props) {
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
			toast.success('Sua mensagem foi enviada! Obrigado!');
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
						<DialogTitle>Suporte & Feedback</DialogTitle>
						<DialogDescription>
							Encontrou um bug, ou tem uma ideia de melhoria? Me conta mais!
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
								{isPending ? 'Enviando...' : 'Enviar'}
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
	const { control } = useFormContext<FormState>();

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor="type" className="text-sm w-fit">
				Tipo
			</label>
			<Controller
				name="type"
				control={control}
				rules={{
					required: 'Esse campo é obrigatório',
				}}
				render={({ field, fieldState }) => (
					<Select
						value={field.value ?? undefined}
						onValueChange={field.onChange}
					>
						<SelectTrigger id="type" errorMessage={fieldState.error?.message}>
							<SelectValue placeholder="Selecione um tipo" />
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

const selectOptions: Record<FeedbackType, string> = {
	bug: 'Bug',
	feature: 'Melhoria',
	feedback: 'Feedback',
};

function MessageField() {
	const { control, watch } = useFormContext<FormState>();
	const type = watch('type');
	const textarea = type ? textareaLabelByFormType[type] : defaultTextareaLabel;

	return (
		<div className="flex-1 flex flex-col gap-1">
			<label htmlFor="content" className="text-sm w-fit">
				{textarea.label}
			</label>
			<Controller
				name="message"
				control={control}
				rules={{
					required: 'Esse campo é obrigatório',
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
