/* eslint-disable @typescript-eslint/no-unused-vars */
import { internalMutation, MutationCtx, QueryCtx } from '../_generated/server';
import { v } from 'convex/values';

export const upsert = internalMutation({
  args: {
    username: v.string(),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, {
        username: args.username,
        image: args.image,
      });
    } else {
      await ctx.db.insert('users', {
        username: args.username,
        image: args.image,
        clerkId: args.clerkId,
      });
    }
  },
});

export const remove = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUserByClerkId(ctx, args.clerkId);

    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});

const getUserByClerkId = (ctx: QueryCtx | MutationCtx, clerkId: string) => {
  return ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
    .unique();
};
