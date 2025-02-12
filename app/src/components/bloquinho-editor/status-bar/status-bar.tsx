'use client';

import { SlidersVerticalIcon } from 'lucide-react';
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
import type { Extension } from 'src/lib/types/bloquinho';
import { usePublicServerInfo } from 'src/providers/public-server-info-provider';
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
	const { appVersion } = usePublicServerInfo();
	const hasLeftContent = Boolean(appVersion);
	const title = titleByStatus[props.status];

	return (
		<footer className="border-t border-t-zinc-200 py-2 px-3 shrink-0 flex gap-8 items-center justify-between">
			{hasLeftContent && (
				<div className="shrink-0">
					{appVersion && (
						<span className="font-mono text-xs text-zinc-500">
							{appVersion}
						</span>
					)}
				</div>
			)}
			<div className="shrink-0 ml-auto flex flex-wrap items-center justify-start gap-4 h-full">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<SlidersVerticalIcon className="w-4 h-4" />
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
