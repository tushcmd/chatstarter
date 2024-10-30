import { v } from 'convex/values';
import { authenticatedQuery } from './helpers';

export const get = authenticatedQuery({
  args: {
    id: v.id('directMessages'),
  },
  handler: async (ctx, { id }) => {
    const member = await ctx.db
      .query('directMessageMembers')
      .withIndex('by_direct_message_user', (q) =>
        q.eq('directMessage', id).eq('user', ctx.user._id)
      )
      .first();
    if (!member) {
      throw new Error('You are not a member of this direct message');
    }
    return await ctx.db.get(id);
    const otherMember = await ctx.db
      .query('directMessageMembers')
      .withIndex('by_direct_message', (q) => q.eq('directMessage', id))
      .filter((q) => q.neq(q.field('user', ctx.user._id)))
      .first();

    if (!otherMember) {
      throw new Error('Direct message has no other member');
    }
    return await ctx.db.get(id);
  },
});
