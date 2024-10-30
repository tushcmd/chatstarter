import { v } from 'convex/values';
import { query, mutation } from '../_generated/server';

export const list = query({
  args: {
    directMessage: v.id('directMessages'),
  },
  handler: async (ctx, { directMessage }) => {
    return await ctx.db.query('messages').collect();
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
