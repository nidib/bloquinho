import clsx from 'clsx';
import { cva } from 'class-variance-authority';

import { Extension, extensions } from '../utils/constants/extensions';
import { Select } from './core/select';
import { Checkbox } from './core/checkbox';

const loadingIndicator = cva(['w-[15px] h-[15px] z-[200] rounded-full'], {
	variants: {
		status: {
			loading: ['bg-yellow-600'],
			done: ['bg-green-600'],
			error: ['bg-red-600'],
		},
	},
});

export const StatusEnum = {
	LOADING: 'loading',
	DONE: 'done',
	ERROR: 'error',
} as const;

export type Status = (typeof StatusEnum)[keyof typeof StatusEnum];

type Props = {
	status: Status;
	lineWrap: boolean;
	extension: Extension;
	onExtensionChange: (extension: Extension) => void;
	onLineWrapChange: (lineWrap: boolean) => void;
};

const titleByStatus: Record<Status, string> = {
	[StatusEnum.LOADING]: 'Carregando bloquinho...',
	[StatusEnum.DONE]: 'Bloquinho atualizado!',
	[StatusEnum.ERROR]: 'Algo deu errado!',
};

const extensionsList = Object.values(extensions);

export function StatusBar(props: Props) {
	const { status, lineWrap, extension, onExtensionChange, onLineWrapChange } = props;
	const title = titleByStatus[status];

	return (
		<div
			className={clsx([
				'h-[36px]',
				'flex',
				'items-center',
				'justify-end',
				'gap-4',
				'px-4',
				'py-1',
				'bg-[#f5f5f5]',
				'border-t',
				'border-[#ddd]',
			])}
		>
			<Checkbox id="lineWrap" title="Quebra de linha: " value={lineWrap} onChange={onLineWrapChange} />
			<Separator />
			<Select id={'extension'} title={'Extensão: '} onChange={onExtensionChange} selectedValue={extension}>
				{extensionsList.map((ext) => (
					<Select.Option key={ext.value} value={ext.value}>
						{ext.displayName}
					</Select.Option>
				))}
			</Select>
			<Separator />
			<Status title={title} status={status} />
		</div>
	);
}

function Separator() {
	return <div className={clsx(['w-[1px]', 'bg-zinc-300', 'h-[50%]'])} />;
}

function Status({ title, status }: { title: string; status: Status }) {
	return <div title={title} className={loadingIndicator({ status })} />;
}
