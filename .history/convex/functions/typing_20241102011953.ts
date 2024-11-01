import { internal } from "../_generated/api";
import { internalMutation } from "../_generated/server";
import { authenticatedMutation, authenticatedQuery } from "./helpers";
import { v } from "convex/values";

export const list = authenticatedQuery({
  args: {
    directMessage: v.id("directMessages"),
  },
  handler: async (ctx, { directMessage }) => {
    const typingIndicators = await ctx.db
      .query("typingIndicators")
      .withIndex("by_direct_message", (q) =>
        q.eq("directMessage", directMessage),
      )
      .filter((q) => q.eq(q.field("user")))
      .collect();
  },
});

export const upsert = authenticatedMutation({
  args: {
    directMessage: v.id("directMessages"),
  },
  handler: async (ctx, { directMessage }) => {
    const existing = await ctx.db
      .query("typingIndicators")
      .withIndex("by_user_direct_message", (q) =>
        q.eq("user", ctx.user._id).eq("directMessage", directMessage),
      )
      .unique();

    const expiresAt = Date.now() + 5000;
    if (existing) {
      await ctx.db.patch(existing._id, { expiresAt });
    } else {
      await ctx.db.insert("typingIndicators", {
        user: ctx.user._id,
        directMessage,
        expiresAt,
      });
    }
    await ctx.scheduler.runAt(expiresAt, internal.functions.typing.remove, {
      directMessage,
      user: ctx.user._id,
      expiresAt,
    });
  },
});

export const remove = internalMutation({
  args: {
    directMessage: v.id("directMessages"),
    user: v.id("users"),
    expiresAt: v.number(),
  },
  handler: async (ctx, { directMessage, user, expiresAt }) => {
    const existing = await ctx.db
      .query("typingIndicators")
      .withIndex("by_user_direct_message", (q) =>
        q.eq("user", user).eq("directMessage", directMessage),
      )
      .unique();
    if (existing && existing.expiresAt === expiresAt) {
      ctx.db.delete(existing._id);
    }
  },
});