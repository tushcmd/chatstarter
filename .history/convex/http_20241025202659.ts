/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { Webhook } from 'svix';

const http = httpRouter();

http.route({
  method: 'POST',
  path: '/clerk-webhook',
  handler: httpAction(async (ctx, req) => {
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
    const webhook = new Webhook(process.env.SVIX_SECRET_KEY as string);
    return webhook.verify(text, {
      id: svix_id!,
      timestamp: svix_timestamp!,
      signature: svix_signature!,
    });
  } catch (error) {
    return null;
  }

  //   if (!valid) {}
};
export default http;
