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

const validateRequest = async( req: Request ) => {
    const svix_id = req.headers.get('svix-id');
    cosnt svix_timestamp = req.headers.get("svix-timestamp");
    cosnt svix_signature = req.headers.get("svix-signature")
}
export default http;
