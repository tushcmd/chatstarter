import { v } from 'convex/values';
import { query, mutation } from '../_generated/server';
import { authenticatedQuery } from './helpers';

export const list = authenticatedQuery({
  args: {
    directMessage: v.id('directMessages'),
  },
  handler: async (ctx, { directMessage }) => {
    return await ctx.db
      .query('messages')
      .withIndex('by_direct_message', (q) =>
        q.eq('directMessage', directMessage)
      )
      .collect();
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
