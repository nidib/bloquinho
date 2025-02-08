'use client';

import { Checkbox } from 'src/components/form/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/components/form/select';
import type { Extension } from 'src/lib/types/bloquinho';
import { cn, cva } from 'src/utils/classes';

type Status = 'loading' | 'done' | 'error';

const titleByStatus: Record<Status, string> = {
	loading: 'Carregando bloquinho...',
	done: 'Bloquinho atualizado!',
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
			<Status title={title} status={props.status} />
		</footer>
	);
}

const loadingIndicator = cva('w-[15px] h-[15px] z-[200] rounded-full', {
	variants: {
		status: {
			loading: ['bg-yellow-600'],
			done: ['bg-green-600'],
			error: ['bg-red-600'],
		},
	},
});

function Status({ title, status }: { title: string; status: Status }) {
	return <div title={title} className={loadingIndicator({ status })} />;
}

function Separator() {
	return <div className={cn('w-[1px] bg-zinc-200 h-[50%]')} />;
}

type ExtensionsSelectProps = {
	value: Extension;
	onChange: (value: Extension) => void;
};

function ExtensionsSelect(props: ExtensionsSelectProps) {
	const displayedExtensions: Record<
		Extension,
		{ value: Extension; displayName: string }
	> = {
		txt: {
			value: 'txt',
			displayName: 'Text',
		},
		java: {
			value: 'java',
			displayName: 'Java',
		},
		js: {
			value: 'js',
			displayName: 'JavaScript',
		},
		// jsx: {
		// 	value: 'jsx',
		// 	displayName: 'Javascript (JSX)',
		// },
		ts: {
			value: 'ts',
			displayName: 'Typescript',
		},
		// tsx: {
		// 	value: 'tsx',
		// 	displayName: 'Typescript (TSX)',
		// },
		sql: {
			value: 'sql',
			displayName: 'SQL',
		},
		html: {
			value: 'html',
			displayName: 'HTML',
		},
		py: {
			value: 'py',
			displayName: 'Python',
		},
		md: {
			value: 'md',
			displayName: 'Markdown',
		},
		css: {
			value: 'css',
			displayName: 'CSS',
		},
	};

	return (
		<Select value={props.value} onValueChange={props.onChange}>
			<SelectTrigger className="w-[180px] text-xs">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{Object.values(displayedExtensions).map((ext) => (
					<SelectItem key={ext.value} value={ext.value}>
						{ext.displayName}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
