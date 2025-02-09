import type { Extension } from 'src/lib/types/bloquinho';
import { z } from 'zod';

const BASE_URL = 'https://emkc.org/api/v2/piston';

const runtimesSchema = z.array(
	z.object({
		language: z.string(),
		version: z.string(),
		aliases: z.array(z.string()),
		runtime: z.string().optional(),
	}),
);

export type Runtime = z.infer<typeof runtimesSchema>[number];

// TODO: Move to api router and cache it there
async function getRuntimes() {
	const response = await fetch(`${BASE_URL}/runtimes`);
	const data = await response.json();

	return runtimesSchema.parse(data);
}

type RuntimePredicate =
	| null
	| ((params: {
			language: string;
			runtime?: string;
	  }) => boolean);

export const EXECUTION_PARAM_EXTRACTOR_BY_EXTENSION: Record<
	Extension,
	RuntimePredicate
> = {
	js: ({ language, runtime }) => {
		return language === 'javascript' && runtime === 'node';
	},
	ts: ({ language, runtime }) => {
		return language === 'typescript' && runtime === 'deno';
	},
	py: ({ language }) => {
		return language === 'python';
	},
	css: null,
	html: null,
	java: null,
	sql: null,
	txt: null,
	md: null,
};

const executionResponseSchema = z.object({
	run: z.object({
		code: z.number(),
		stdout: z.string(),
		stderr: z.string(),
	}),
});

async function execute(language: string, version: string, content: string) {
	const response = await fetch(`${BASE_URL}/execute`, {
		method: 'POST',
		body: JSON.stringify({
			language,
			version,
			files: [{ name: 'main', content }],
		}),
	});
	const data = await response.json();

	return executionResponseSchema.parse(data);
}

export const PistonApi = {
	getRuntimes,
	execute,
};
