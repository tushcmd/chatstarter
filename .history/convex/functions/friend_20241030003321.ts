import { authenticatedQuery } from './helpers';

export const listPending = authenticatedQuery({
  handler: async (ctx) => {
    const friends = await ctx.db
      .query('friends')
      .withIndex('by_user2_status', (q) =>
        q.eq('user2', ctx.user._id).eq('status', 'pending')
      )
      .collect();
    return await Promise.all(
      friends.map(async (friend) => {
        const user = await ctx.db.get(friend.user1);
        return {
          ...friend,
          user,
        };
      })
    );
  },
});
