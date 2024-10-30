import { customQuery, customCtx } from 'convex-helpers/server/customFunctions';
import { getCurrentUser } from './user';

export const authenticatedQuery = customQuery(
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error('Not authenticated');
    }
    return { user };
  })
);
