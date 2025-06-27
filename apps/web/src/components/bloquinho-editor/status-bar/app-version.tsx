import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useQuery } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useMemo } from 'react';
import Markdown, { type Components } from 'react-markdown';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from 'src/components/dialog';
import { GithubIcon } from 'src/components/icons/github-icon';
import type { Release } from 'src/lib/client/api/github';
import { Api } from 'src/lib/client/client-api';
import { useI18n } from 'src/providers/i18n-provider';

export function AppVersion() {
	const { data: latestRelease, isFetching, isError } = useLatestRelease();

	if (isError) {
		return null;
	}

	if (isFetching || !latestRelease) {
		return (
			<span className="font-mono text-xs text-transparent select-none bg-zinc-300 rounded-md animate-pulse">
				v0.0.0
			</span>
		);
	}

	return (
		<Dialog>
			<DialogTrigger>
				<span className="font-mono text-xs text-zinc-500">
					{latestRelease.name}
				</span>
			</DialogTrigger>
			<DialogContent className="gap-8">
				<DialogHeader>
					<DialogTitle className="font-bold text-xl flex gap-4 items-center">
						Bloquinho{' '}
						<a
							href="https://github.com/nidib/bloquinho"
							aria-label="Link para o repositório"
							className="text-black/80 hover:text-black"
						>
							<GithubIcon />
						</a>
					</DialogTitle>
					<VisuallyHidden>
						<DialogDescription>Informações da versão atual</DialogDescription>
					</VisuallyHidden>
				</DialogHeader>
				<Version version={latestRelease} />
			</DialogContent>
		</Dialog>
	);
}

function useLatestRelease() {
	return useQuery({
		queryKey: ['app-version'],
		queryFn: Api.Github.getLatestRelease,
	});
}

type VersionProps = {
	version: Release;
};

function Version(props: VersionProps) {
	const { version } = props;
	const { t, language } = useI18n();
	const markdown = useMemo(
		() => <Markdown components={markdownComponents}>{version.body}</Markdown>,
		[version.body],
	);

	return (
		<div>
			<div className="flex gap-6 justify-between mb-2">
				<p>
					<strong className="font-bold">{t('Version')}: </strong>
					<span className="text-sm font-mono">{version.name}</span>
				</p>
				<p>
					<strong className="font-bold">{t('PublishedAt')}: </strong>
					<span className="text-sm font-mono">
						{version.publishedAt.toLocaleDateString(language)}
					</span>
				</p>
			</div>
			<div className="border shadow-sm border-solid border-zinc-200 rounded-md px-3 py-2">
				{markdown}
			</div>
		</div>
	);
}

const markdownComponents: Components = {
	h2: (props) => {
		return <h2 {...omit(props, 'node')} className="text-lg font-bold mb-3" />;
	},
	ul: (props) => {
		return (
			<ul
				{...omit(props, 'node')}
				className="list-disc list-inside space-y-2"
			/>
		);
	},
	strong: (props) => {
		return <strong {...omit(props, 'node')} className="font-semibold" />;
	},
};
