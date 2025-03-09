import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
  args: {
    record: v.any(),
    uid: v.optional(v.id("users")),
    // uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    console.log(args.uid);
    const insertedIds = await Promise.all(
      args.record.map(
        async (record: any) =>
          await ctx.db.insert("userAiAssistants", {
            ...record,
            uid: args.uid,
          })
      )
    );

    return insertedIds;
  },
});
