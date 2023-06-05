export function removeAccents(str: string): string {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

export function replaceWhiteSpacesByDashes(str: string): string {
	return str
		.trim()
		.replace(/\s+/g, ' ')
		.split(' ')
		.join('-');
}
