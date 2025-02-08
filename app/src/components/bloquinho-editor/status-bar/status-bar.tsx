'use client';

import { ExtensionsSelect } from 'src/components/bloquinho-editor/status-bar/extensions-select';
import { StatusIndicator } from 'src/components/bloquinho-editor/status-bar/status-indicator';
import { Checkbox } from 'src/components/form/checkbox';
import type { Extension } from 'src/lib/types/bloquinho';
import { cn } from 'src/utils/classes';

type Status = 'pending' | 'success' | 'error';

const titleByStatus: Record<Status, string> = {
	pending: 'Carregando bloquinho...',
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
		<footer className="font-mono border-t border-t-zinc-200 py-2 px-3 shrink-0 flex items-center justify-end gap-4">
			<div className="flex items-center justify-start gap-2">
				<label htmlFor="line-wrap" className="cursor-pointer text-xs">
					Quebra de linha:
				</label>
				<Checkbox
					id="line-wrap"
					value={props.lineWrap}
					onChange={props.onLineWrapChange}
				/>
			</div>
			<Separator />
			<ExtensionsSelect
				value={props.extension}
				onChange={props.onExtensionChange}
			/>
			<Separator />
			<StatusIndicator title={title} status={props.status} />
		</footer>
	);
}

function Separator() {
	return <div className={cn('w-[1px] bg-zinc-200 h-[50%]')} />;
}
