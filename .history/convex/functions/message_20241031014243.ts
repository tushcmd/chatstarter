import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { authenticatedQuery } from './helpers';

export const list = authenticatedQuery({
  args: {
    directMessage: v.id('directMessages'),
  },
  handler: async (ctx, { directMessage }) => {
    const member = await ctx.db
      .query('directMessageMembers')
      .withIndex('by_direct_message_user', (q) =>
        q.eq('directMessage', directMessage).eq('user', ctx.user._id)
      )
      .first();
    if (!member) {
      throw new Error('You are not a member of this direct message');
    }
    const messages = await ctx.db
      .query('messages')
      .withIndex('by_direct_message', (q) =>
        q.eq('directMessage', directMessage)
      )
      .collect();
    return await Promise.all(async (message) => {
      const sender = await ctx.db.get(message.sender);
      return { ...message, sender };
    });
  },
});

export const create = mutation({
  args: {
    sender: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { sender, content }) => {
    await ctx.db.insert('messages', { sender, content });
  },
});
