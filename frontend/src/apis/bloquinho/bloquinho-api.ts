import axios from 'axios';

import { Extension } from '../../utils/constants/extensions';

export const bloquinhoApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/',
});

export type PersistedBloquinho = {
	id: string;
	title: string;
	content: string;
	extension: Extension;
	lastViewedAt: string;
	updatedAt: string;
};

export type NewBloquinho = {
	id?: undefined;
	title: string;
	content: string;
	extension: Extension;
	lastViewedAt?: undefined;
	updatedAt?: undefined;
};
