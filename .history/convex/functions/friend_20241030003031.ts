import { authenticatedQuery } from './helpers';

export const listPending = authenticatedQuery({
  handler: async (ctx) => {
    const friends = await ctx.db
      .query('friends')
      .withIndex('by_user2_status', (q) =>
        q.eq('user2', ctx.user._id).eq('status', 'pending')
      )
      .collect();
    return friends;
  },
});
