/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL?: string;
	readonly MAINTENANCE?: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
