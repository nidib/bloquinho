'use client';

import { useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/components/form/select';
import type { Extension } from 'src/lib/types/bloquinho';

type ExtensionsSelectProps = {
	value: Extension;
	onChange: (value: Extension) => void;
};

export function ExtensionsSelect(props: ExtensionsSelectProps) {
	const items = useMemo(
		() =>
			displayedExtensions.map((ext) => (
				<SelectItem key={ext.value} value={ext.value}>
					<span className="flex gap-1 items-center">
					{ext.displayName}
						{ext.showNewBadge && (
							<div className="w-1 h-1 rounded-full bg-green-500" />
						)}
					</span>
				</SelectItem>
			)),
		[],
	);

	return (
		<Select value={props.value} onValueChange={props.onChange}>
			<SelectTrigger className="w-[180px] text-xs font-mono">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>{items}</SelectContent>
		</Select>
	);
}

type ExtensionListItem = {
	value: Extension;
	displayName: string;
	showNewBadge?: boolean;
};

const displayedExtensions: ExtensionListItem[] = [
	{
		value: 'txt',
		displayName: 'Text',
	},
	{
		value: 'java',
		displayName: 'Java',
	},
	{
		value: 'js',
		displayName: 'JavaScript',
	},
	{
		value: 'ts',
		displayName: 'Typescript',
	},
	{
		value: 'sql',
		displayName: 'SQL',
	},
	{
		value: 'html',
		displayName: 'HTML',
	},
	{
		value: 'py',
		displayName: 'Python',
	},
	{
		value: 'md',
		displayName: 'Markdown',
	},
	{
		value: 'css',
		displayName: 'CSS',
	},
];
