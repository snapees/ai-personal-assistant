import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    // if user already exists, return the existing user
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      // else create a new user
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 5000,
      };

      console.log("data==", data);
      const result = await ctx.db.insert("users", data);
      return data;
    }

    return user[0];
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // console.log(user[0]);
    return user[0];
  },
});
