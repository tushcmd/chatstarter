/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';

const http = httpRouter();

http.route({
  method: 'POST',
  path: '/clerk-webhook',
  handler: httpAction(async (ctx, req) => {
    const body = await validateRequest(req);
    if (!body) {
      return new Response('Unauthorized', {
        status: 400,
      });
    }
    switch (body.type) {
      case 'user.created':
        break;
      case 'user.updated':
        break;
    }
    return new Response('OK', {
      status: 200,
    });
  }),
});

const validateRequest = async (req: Request) => {
  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  const text = await req.text();
  try {
    const webhook = new Webhook(process.env.SVIX_SECRET_KEY!);
    return webhook.verify(text, {
      id: svix_id!,
      timestamp: svix_timestamp!,
      signature: svix_signature!,
    }) as unknown as WebhookEvent;
  } catch (error) {
    return null;
  }

  //   if (!valid) {}
};
export default http;
