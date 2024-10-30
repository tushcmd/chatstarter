import { v } from 'convex/values';
import { authenticatedQuery } from './helpers';

export const get = authenticatedQuery({
  args: {
    id: v.id('directMessages'),
  },
  handler: async (ctx, { id }) => {
    const member = await ctx.db
      .query('directMessageMembers')
      .withIndex('by_direct_message_user', (q) => q.eq('user', ctx.user._id))
      .first();
    return await ctx.db.get(id);
  },
});
