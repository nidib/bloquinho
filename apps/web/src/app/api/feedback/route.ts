/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-assignment */
import { NextResponse } from 'next/server';

import { MailServices } from 'src/lib/infra/mail/services/mail-services';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		await MailServices.sendFeedbackEmail(body);
		return NextResponse.json(null, { status: 200 });
	} catch (error: unknown) {
		console.error({ error });
		return NextResponse.json(null, { status: 500 });
	}
}
