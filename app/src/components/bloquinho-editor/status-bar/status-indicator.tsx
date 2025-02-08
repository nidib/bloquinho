import { cva } from 'src/utils/classes';

type Status = 'pending' | 'success' | 'error';

const statusIndicatorVariants = cva('w-[15px] h-[15px] z-[200] rounded-full', {
	variants: {
		status: {
			pending: ['bg-yellow-600'],
			success: ['bg-green-600'],
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
