export function removeAccents(str: string): string {
	// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
