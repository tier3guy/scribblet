import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getAllTeams = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('teams').collect();
        const teamIds: string[] = [];

        result.map((team: any) => {
            const collaborators = team?.collaborators;
            collaborators?.map((collaborator: any) => {
                if (collaborator?.email === args.email) {
                    teamIds.push(team?._id);
                }
            });
        });

        const teams: any = [];

        for (let i = 0; i < teamIds.length; i++) {
            let id = teamIds[i];
            const team = await ctx.db
                .query('teams')
                .filter((q) => q.eq(q.field('_id'), id))
                .collect();
            teams.push(...team);
        }

        return teams;
    },
});

export const createTeam = mutation({
    args: {
        kindeId: v.string(),
        email: v.string(),
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

        const { email, ...restArgs } = args;
        return await ctx.db.insert('teams', {
            ...restArgs,
            teamCreator: email,
            collaborators: [
                {
                    email,
                    isAdmin: true,
                },
            ],
        });
    },
});

export const addCollaborator = mutation({
    args: {
        teamId: v.id('teams'),
        host: v.string(),
        collaboratorMail: v.string(),
        isAdmin: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { host, teamId } = args;
        const team = await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('_id'), teamId))
            .unique();
        if (!team) {
            return {
                error: 'Oops! No such team Found',
                data: null,
            };
        }

        const collaboratorsMails = team.collaborators;

        // Hosts Validation
        const hostsInfo = collaboratorsMails.find((c: any) => c.email === host);
        if (!hostsInfo || !hostsInfo?.isAdmin) {
            return {
                error: 'Oops! You do not have any previlage to invite people on the team. Only admin of the team can add collaborators.',
                data: null,
            };
        }

        // Host's validation success
        // Check if invitee is already in the list or not
        const ifAlreadyInvited = collaboratorsMails.find(
            (c: any) => c.email === args.collaboratorMail,
        );

        if (ifAlreadyInvited) {
            return {
                error: `User with email ${args.collaboratorMail} has been already added to this team`,
                data: null,
            };
        }

        // Add the collaborator to the team
        try {
            await ctx.db.patch(args.teamId, {
                collaborators: [
                    ...collaboratorsMails,
                    {
                        email: args.collaboratorMail,
                        isAdmin: args.isAdmin,
                    },
                ],
            });
            return {
                error: null,
                data: null,
            };
        } catch (error) {
            // Error handling
            return {
                error: error,
                data: null,
            };
        }
    },
});
