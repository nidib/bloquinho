import { type CreateEmailOptions, Resend } from 'resend';
import { type FeedbackType, feedbackTypes } from 'src/lib/types/feedback';
import { Envs } from 'src/utils/constants/envs';
import { z } from 'zod';

const resend = new Resend(Envs.RESEND_API_KEY ?? 're_123');

const feedbackEmailBodySchema = z.object({
	type: z.enum(feedbackTypes),
	message: z.string().nonempty(),
});

const titleByFeedbackType: Record<FeedbackType, string> = {
	bug: 'Alguém encontrou um bug!',
	feature: 'Alguém teve uma idea!',
};

async function sendFeedbackEmail(content: {
	type: FeedbackType;
	message: string;
}) {
	const body = feedbackEmailBodySchema.parse(content);
	const email: CreateEmailOptions = {
		from: 'Bloquinho <hello@feedback.bloquinho.app>',
		to: ['richardbidin@outlook.com'],
		subject: titleByFeedbackType[body.type],
		text: body.message,
	};

	if (!Envs.RESEND_API_KEY) {
		console.log('would send the email:', email);
		return true;
	}

	const { error } = await resend.emails.send(email);
	if (error) {
		console.error({ error });
		return false;
	}

	return true;
}

export const MailServices = {
	sendFeedbackEmail,
};
