export function removeAccents(str: string): string {
	return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
}

export function replaceWhiteSpacesByDashes(str: string): string {
	return str.trim().replace(/\s+/g, ' ').split(' ').join('-');
}

export function removeEspecialCharacters(str: string): string {
	return str.replace(/[^a-z0-9-]/g, '');
}

export function normalizeBloquinhoTitle(title: string): string {
	return removeEspecialCharacters(
		replaceWhiteSpacesByDashes(removeAccents(title.toLowerCase())),
	);
}
