import { v } from 'convex/values';
import { authenticatedQuery } from './helpers';
import { QueryCtx } from '../_generated/server';

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

const getDirectMessage = async (ctx: QueryCtx, id: Id<'directMessages'>) => {
  // Fetch the direct message details
  const dm = await ctx.db.get(id);

  if (!dm) {
    throw new Error('Direct message not found');
  }

  // Find the other member of this direct message
  const otherMember = await ctx.db
    .query('directMessageMembers')
    .withIndex('by_direct_message', (q) => q.eq('directMessage', id))
    .filter((q) => q.neq(q.field('user'), ctx.user._id))
    .first();

  if (!otherMember) {
    throw new Error('Direct message has no other member');
  }

  // Get details of the other user
  const user = await ctx.db.get(otherMember.user);

  if (!user) {
    throw new Error('User not found');
  }

  // Return combined direct message and user information
  return {
    ...dm,
    user,
  };
};
