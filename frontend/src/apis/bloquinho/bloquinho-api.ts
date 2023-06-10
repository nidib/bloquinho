import axios from 'axios';

export const bloquinhoApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
});

export const supportedExtensions = ['java', 'js', 'jsx', 'ts', 'tsx', 'txt'] as const;

export type SupportedExtensions = (typeof supportedExtensions)[number];

export type PersistedBloquinho = {
	id: string;
	title: string;
	content: string;
	extension: SupportedExtensions;
	lastViewedAt: string;
	updatedAt: string;
};

export type NewBloquinho = Omit<PersistedBloquinho, 'id' | 'lastViewedAt' | 'updatedAt'>;
