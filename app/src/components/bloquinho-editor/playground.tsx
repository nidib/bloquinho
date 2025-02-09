import type { Truthy } from 'lodash';
import noop from 'lodash/noop';
import type { ReactNode } from 'react';
import { cn } from 'src/utils/classes';

type Props = {
	stdout: string;
	stderr: string;
	didError: boolean;
	executeButton: ReactNode;
	runtimeDetails?: { language: string; runtime?: string; version?: string };
	errorMessage?: ReactNode;
	className?: string;
};

export function Playground({ className, ...props }: Props) {
	const runtimeDetails = [
		props.runtimeDetails?.language,
		props.runtimeDetails?.runtime,
		props.runtimeDetails?.version,
	]
		.filter(Boolean)
		.join(' | ');

	return (
		<div
			className={cn(
				'border-l border-l-zinc-200 flex flex-col items-center justify-start px-5 py-10 bg-zinc-50',
				className,
			)}
		>
			<h1 className="flex text-3xl font-bold mb-2">Playground</h1>
			<h2 className="text-lg font-normal text-center mb-4">
				Aqui é onde seu bloquinho pode ser executado, <br /> e seu resultado
				visualizado abaixo.
			</h2>
			<div className="flex flex-col items-center gap-2 mb-4">
				{props.executeButton}
				{runtimeDetails.length > 0 && (
					<p className="text-xs text-zinc-400 font-mono">{runtimeDetails}</p>
				)}
				{props.errorMessage && (
					<p className="text-sm text-red-500 text-center">
						{props.errorMessage}
					</p>
				)}
			</div>
			<label htmlFor="stdout" className="self-start text-sm mb-1">
				stdout:
			</label>
			<textarea
				id="stdout"
				value={props.stderr || props.stdout}
				onChange={noop}
				className={cn(
					'outline-none resize-none rounded-md font-mono text-sm transition-colors border border-zinc-200 hover:border-zinc-300 h-full w-full max-w-full bg-zinc-100 p-2 overflow-y-scroll text-wrap',
					props.didError && 'text-red-500 border-red-200 hover:border-red-300',
				)}
				contentEditable={false}
			/>
		</div>
	);
}

Playground.ExecuteButton = ExecuteButton;

type ExecuteButtonProps = {
	onRun: VoidFunction;
	disabled: boolean;
	children: Truthy<ReactNode>;
};

function ExecuteButton(props: ExecuteButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				'transition-all flex h-8 w-fit items-center justify-between rounded-md border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 bg-white px-5 py-4 text-lg placeholder:text-zinc-400 focus-visible:outline-none focus-visible:border-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
			)}
			onClick={props.onRun}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}
