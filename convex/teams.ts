import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getAllTeams = query({
    args: {
        kindeId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('kindeId'), args.kindeId))
            .collect();
    },
});

export const createTeam = mutation({
    args: {
        kindeId: v.string(),
        teamName: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if a team with the same teamName already exists
        const existingTeam = await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('kindeId'), args.kindeId))
            .filter((q) => q.eq(q.field('teamName'), args.teamName))
            .collect();

        if (existingTeam.length) {
            return new Error('Team with the same teamName already exists');
        }

        return await ctx.db.insert('teams', args);
    },
});
