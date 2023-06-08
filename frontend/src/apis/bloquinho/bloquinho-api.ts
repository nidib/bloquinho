import axios from 'axios';

export const bloquinhoApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
});

export type CreatedBloquinho = {
	id: string;
	title: string;
	content: string;
};
