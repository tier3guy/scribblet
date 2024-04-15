import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const getUserData = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();
    },
});

export const createUser = mutation({
    args: {
        kindeId: v.string(),
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('users', args);
    },
});
