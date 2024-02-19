/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	readonly VITE_MAINTENANCE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
