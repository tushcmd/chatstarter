import { authenticatedMutation } from "./helpers";
import { v } from "convex/values";

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
  },
});
