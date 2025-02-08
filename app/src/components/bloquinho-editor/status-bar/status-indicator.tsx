import { cva } from 'src/utils/classes';

type Status = 'loading' | 'done' | 'error';

const statusIndicatorVariants = cva('w-[15px] h-[15px] z-[200] rounded-full', {
	variants: {
		status: {
			loading: ['bg-yellow-600'],
			done: ['bg-green-600'],
			error: ['bg-red-600'],
		},
	},
});

type Props = {
	title: string;
	status: Status;
};

export function StatusIndicator({ title, status }: Props) {
	return <div title={title} className={statusIndicatorVariants({ status })} />;
}
