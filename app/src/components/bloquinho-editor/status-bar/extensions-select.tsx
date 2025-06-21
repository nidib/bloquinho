'use client';

import { useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/components/form/select';
import { NewBadgeIcon } from 'src/components/icons/new-badge-icon';
import { useBloquinhoEditorContext } from 'src/components/providers/bloquinho-editor-provider';
import type { Extension } from 'src/lib/types/bloquinho';

export function ExtensionsSelect() {
	const { extension, setExtension } = useBloquinhoEditorContext();

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
		<div className="relative">
			<NewBadgeIcon />
			<Select value={extension} onValueChange={setExtension}>
				<SelectTrigger className="w-[180px] text-xs font-mono">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>{items}</SelectContent>
			</Select>
		</div>
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
	{
		value: 'php',
		displayName: 'PHP',
		showNewBadge: true,
	},
	{
		value: 'go',
		displayName: 'Go',
		showNewBadge: true,
	},
];
