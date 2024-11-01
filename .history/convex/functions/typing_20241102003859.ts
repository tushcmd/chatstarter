import { authenticatedMutation } from "./helpers";
import { v } from "convex/values";

export const upsert = authenticatedMutation({
  args: {
    directMessage: v.id("directMessages"),
  },
  handler: async (ctx, { directMessage }) => {
    const existing = await ctx.db
      .insert("typingIndicators")
      .withIndex("by_user_direct_message", (q) =>
        q.eq("user", ctx.user._id).eq("directMessage", directMessage),
      )
      .first();
  },
});
