import type { FeedbackType } from 'src/lib/types/feedback';

export async function sendFeedbackEmail(type: FeedbackType, message: string) {
	const response = await fetch('/api/feedback', {
		method: 'POST',
		body: JSON.stringify({ type, message }),
	});

	return response.ok;
}
