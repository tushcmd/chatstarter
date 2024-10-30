import { v } from 'convex/values';
import { Id } from '../_generated/dataModel';
import { QueryCtx } from '../_generated/server';
import { authenticatedMutation, authenticatedQuery } from './helpers';

export const listPending = authenticatedQuery({
  handler: async (ctx) => {
    const friends = await ctx.db
      .query('friends')
      .withIndex('by_user2_status', (q) =>
        q.eq('user2', ctx.user._id).eq('status', 'pending')
      )
      .collect();
    return await mapWithUsers(ctx, friends, 'user1');
  },
});

export const listAccepted = authenticatedQuery({
  handler: async (ctx) => {
    const friends1 = await ctx.db
      .query('friends')
      .withIndex('by_user1_status', (q) =>
        q.eq('user1', ctx.user._id).eq('status', 'accepted')
      )
      .collect();

    const friends2 = await ctx.db
      .query('friends')
      .withIndex('by_user2_status', (q) =>
        q.eq('user2', ctx.user._id).eq('status', 'accepted')
      )
      .collect();

    const friendsWithUser1 = await mapWithUsers(ctx, friends1, 'user2');
    const friendsWithUser2 = await mapWithUsers(ctx, friends2, 'user1');
    return [...friendsWithUser1, ...friendsWithUser2];
  },
});

export const updateStatus = authenticatedMutation({
    args: {
        id: v.id('friends'),
        status: v.union(v.literal('accepted'), v.literal('rejected')),
    },
    handler: async (ctx, { id, status }) {
        const friend = await ctx.db.get(id);
        if (!friend) {
            throw new Error('Friend not found');
        }
        if (friend.user1 !== ctx.user._id && friend.user2 !== ctx.user._id) {
            throw new Error('Unauthorized');
        }
        await ctx.db
            .patch(id, { status });
    }
})

const mapWithUsers = async <
  K extends string,
  T extends { [key in K]: Id<'users'> },
>(
  ctx: QueryCtx,
  items: T[],
  key: K
) => {
  const result = await Promise.allSettled(
    items.map(async (item) => {
      const user = await ctx.db.get(item[key]);
      if (!user) {
        throw new Error('User not found');
      }
      return {
        ...item,
        user,
      };
    })
  );
  return result.filter((r) => r.status === 'fulfilled').map((r) => r.value);
};
