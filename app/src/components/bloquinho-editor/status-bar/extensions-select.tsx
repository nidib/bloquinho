'use client';

import { PlayCircleIcon } from 'lucide-react';
import { useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'src/components/form/select';
import { EXECUTION_PARAM_EXTRACTOR_BY_EXTENSION } from 'src/lib/infra/api/piston-api';
import type { Extension } from 'src/lib/types/bloquinho';
import { useFeatureFlags } from 'src/providers/feature-flags-provider';

type ExtensionsSelectProps = {
	value: Extension;
	onChange: (value: Extension) => void;
};

export function ExtensionsSelect(props: ExtensionsSelectProps) {
	const isPlaygroundFeatureEnabled = useFeatureFlags().PLAYGROUND;
	const items = useMemo(() => {
		return displayedExtensions.map((ext) => {
			const extensionSupportsExecution =
				isPlaygroundFeatureEnabled &&
				Boolean(EXECUTION_PARAM_EXTRACTOR_BY_EXTENSION[ext.value]);

			return (
				<SelectItem key={ext.value} value={ext.value}>
					<span className="flex items-center justify-between gap-2 w-full">
						{ext.displayName}
						{extensionSupportsExecution && (
							<PlayCircleIcon
								className="w-3 h-3"
								strokeWidth={3}
								stroke="rgb(113, 113, 122)"
							/>
						)}
					</span>
				</SelectItem>
			);
		});
	}, [isPlaygroundFeatureEnabled]);

	return (
		<Select value={props.value} onValueChange={props.onChange}>
			<SelectTrigger className="w-[180px] text-xs">
				<SelectValue>
					{
						displayedExtensions.find((d) => d.value === props.value)
							?.displayName
					}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>{items}</SelectContent>
		</Select>
	);
}

type ExtensionListItem = {
	value: Extension;
	displayName: string;
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
