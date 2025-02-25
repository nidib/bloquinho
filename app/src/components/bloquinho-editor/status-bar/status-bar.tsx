'use client';

import { BugIcon, SlidersVerticalIcon } from 'lucide-react';
import { AppVersion } from 'src/components/bloquinho-editor/status-bar/app-version';
import { ExtensionsSelect } from 'src/components/bloquinho-editor/status-bar/extensions-select';
import { StatusIndicator } from 'src/components/bloquinho-editor/status-bar/status-indicator';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'src/components/drop-down-menu';
import { FeedbackForm } from 'src/components/feedback/feedback-form';
import { Button } from 'src/components/form/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'src/components/tooltip';
import type { Extension } from 'src/lib/types/bloquinho';
import { cn } from 'src/utils/classes';

type Status = 'pending' | 'success' | 'error';

const titleByStatus: Record<Status, string> = {
	pending: 'Salvando bloquinho...',
	success: 'Bloquinho atualizado!',
	error: 'Algo deu errado!',
};

type Props = {
	lineWrap: boolean;
	onLineWrapChange: (lineWrap: boolean) => void;
	extension: Extension;
	onExtensionChange: (extension: Extension) => void;
	status: Status;
};

export function StatusBar(props: Props) {
	const title = titleByStatus[props.status];

	return (
		<footer className="border-t border-t-zinc-200 py-2 px-[--monaco-scrollbar-width] shrink-0 flex gap-8 items-center justify-between">
			<div className="h-full flex items-center justify-start gap-4">
				<AppVersion />
				<Separator />
				<FeedbackForm trigger={<FeedbackButton />} />
			</div>
			<div className="shrink-0 ml-auto flex flex-wrap items-center justify-start gap-4 h-full">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary">
							<SlidersVerticalIcon className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel>Preferências</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuCheckboxItem
								checked={props.lineWrap}
								onCheckedChange={props.onLineWrapChange}
							>
								<span>Quebra de linha</span>
							</DropdownMenuCheckboxItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<Separator />
				<ExtensionsSelect
					value={props.extension}
					onChange={props.onExtensionChange}
				/>
				<Separator />
				<StatusIndicator title={title} status={props.status} />
			</div>
		</footer>
	);
}

function Separator() {
	return <div className={cn('w-[1px] bg-zinc-200 h-[50%]')} />;
}

function FeedbackButton() {
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<FeedbackForm.Trigger>
					<TooltipTrigger asChild>
						<div className="relative">
							<div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-200 border border-solid border-green-500 text-green-950 py-0.5 px-1 rounded-md text-3xs select-none opacity-90">
								NOVO
							</div>
							<Button variant="secondary">
								<BugIcon className="w-4 h-4" />
							</Button>
						</div>
					</TooltipTrigger>
				</FeedbackForm.Trigger>
				<TooltipContent side="top" align="start">
					Reportar um bug ou sugestão
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
