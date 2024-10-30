import { v } from 'convex/values';
import { authenticatedQuery } from './helpers';

export const list = authenticatedQuery({
  handler: async (ctx) => {
    const directMessages = await ctx.db
      .query('directMessageMembers')
      .withIndex('by_user', (q) => q.eq('user', ctx.user._id))
      .collect();
    return directMessages;
  },
});

export const get = authenticatedQuery({
  args: {
    id: v.id('directMessages'),
  },
  handler: async (ctx, { id }) => {
    // Check if the user is a member of this direct message
    const member = await ctx.db
      .query('directMessageMembers')
      .withIndex('by_direct_message_user', (q) =>
        q.eq('directMessage', id).eq('user', ctx.user._id)
      )
      .first();
    if (!member) {
      throw new Error('You are not a member of this direct message');
    }
  },
});
