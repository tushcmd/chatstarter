import { customQuery, customCtx } from 'convex-helpers/server/customFunctions';
import { getCurrentUser } from './user';
import { query } from '../_generated/server';

export const authenticatedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error('Not authenticated');
    }
    return { user };
  })
);

export const authenticatedMutation = customMutation(
  query,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error('Not authenticated');
    }
    return { user };
  })
);
