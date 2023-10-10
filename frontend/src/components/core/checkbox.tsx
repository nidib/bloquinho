type Props = {
	id: string;
	title: string;
	value: boolean;
	onChange: (value: boolean) => void;
};

export function Checkbox(props: Props) {
	const { id, title, value, onChange } = props;

	return (
		<div className="flex items-center justify-start gap-2">
			<label className="font-mono cursor-pointer" htmlFor={id}>
				{title}
			</label>
			<input type="checkbox" id={id} checked={value} onChange={(e) => onChange(e.currentTarget.checked)} />
		</div>
	);
}
