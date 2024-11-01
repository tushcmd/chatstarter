import { authenticatedMutation } from "./helpers";
import { v } from "convex/values";

export const upsert = authenticatedMutation({
  args: {
    directMessage: v.id("directMessages"),
  },
  handler: async (ctx, { directMessage }) => {
    const existing = await ctx.db.insert("typingIndicators", {
      directMessage,
      user: ctx.user._id,
    });
  },
});
