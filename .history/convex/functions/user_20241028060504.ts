import { internalMutation } from '../_generated/server';
import { v } from 'convex/values';

export const create = internalMutation({
  args: {
    username: v.string(),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withdraw('by_clerk_id', (q) => q.eq('clerkId', args.clerkId));
    // await ctx.db.insert("users", { username, image, clerkId });
  },
});
