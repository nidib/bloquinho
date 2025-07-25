import { Resend } from 'resend';
import type { CreateEmailOptions } from 'resend';
import { z } from 'zod';

import { feedbackTypes } from 'src/lib/types/feedback';
import type { FeedbackType } from 'src/lib/types/feedback';
import { Envs } from 'src/utils/constants/envs';

const resend = new Resend(Envs.RESEND_API_KEY);

const feedbackEmailBodySchema = z.object({
	type: z.enum(feedbackTypes),
	message: z.string().nonempty(),
});

const titleByFeedbackType: Record<FeedbackType, string> = {
	bug: 'Alguém encontrou um bug!',
	feature: 'Alguém teve uma idea!',
	feedback: 'Alguém deixou um feedback!',
};

async function sendFeedbackEmail(content: {
	type: FeedbackType;
	message: string;
}) {
	const body = feedbackEmailBodySchema.parse(content);
	const email: CreateEmailOptions = {
		from: `Bloquinho <${Envs.RESEND_FEEDBACK_FROM}>`,
		to: [Envs.RESEND_FEEDBACK_TO],
		subject: titleByFeedbackType[body.type],
		text: body.message,
	};

	if (!Envs.RESEND_API_KEY) {
		// eslint-disable-next-line no-console
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
