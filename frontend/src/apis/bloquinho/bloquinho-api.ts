import axios from 'axios';


export const bloquinhoApi = axios.create({
	baseURL: import.meta.env.API_BASE_URL ?? 'http://localhost:8080/api',
});

export type CreatedBloquinho = {
	id: string;
	title: string;
	content: string;
};
