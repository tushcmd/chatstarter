import { authenticatedMutation } from "./helpers";
import { v } from "convex/values";

export const upsert = authenticatedMutation({
  args: {
    directMessage: v.id("directMessages"),
  },
});
