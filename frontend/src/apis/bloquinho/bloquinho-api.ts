import axios from 'axios';


export const bloquinhoApi = axios.create({
	baseURL: 'http://localhost:8080/api'
});

export type CreatedBloquinho = {
	id: string;
	title: string;
	content: string;
};

