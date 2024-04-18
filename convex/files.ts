import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.string(),
        teamName: v.string(),
        authorId: v.string(),
        authorEmail: v.string(),
        isPrivate: v.boolean(),
        collaborators: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('files', {
            ...args,
            lastEditedAt: Date.now(),
            document: '',
            canvas: '',
            isArchieved: false,
        });
    },
});

export const getAllTeamFiles = query({
    args: {
        authorId: v.string(),
        teamId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('teamId'), args.teamId))
            .collect();
    },
});

export const getAllFiles = query({
    args: {
        authorId: v.string(),
        teamId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('teamId'), args.teamId))
            .collect();
    },
});

export const getFile = query({
    args: {
        fileId: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('_id'), args.fileId))
            .unique();

        const ifUserIsAuthorizedToViewFile = result.collaborators.find(
            (collaborator: any) => collaborator.email === args.email,
        );
        if (ifUserIsAuthorizedToViewFile) return result;
        return null;
    },
});

export const updateFile = mutation({
    args: {
        fileId: v.id('files'),
        updatedDocument: v.string(),
    },
    handler: async (ctx, args) => {
        const { fileId, updatedDocument } = args;
        return await ctx.db.patch(fileId, {
            document: updatedDocument,
            lastEditedAt: Date.now(),
        });
    },
});

export const updateArchieveStatus = mutation({
    args: {
        fileId: v.id('files'),
        isArchieved: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { fileId, isArchieved } = args;
        return await ctx.db.patch(fileId, {
            isArchieved: isArchieved,
        });
    },
});

export const updateCanvas = mutation({
    args: {
        fileId: v.id('files'),
        updatedCanvas: v.string(),
    },
    handler: async (ctx, args) => {
        const { fileId, updatedCanvas } = args;
        return await ctx.db.patch(fileId, {
            canvas: updatedCanvas,
            lastEditedAt: Date.now(),
        });
    },
});

export const updateFileName = mutation({
    args: {
        fileId: v.id('files'),
        fileName: v.string(),
    },
    handler: async (ctx, args) => {
        const { fileId, fileName } = args;
        return await ctx.db.patch(fileId, {
            fileName,
        });
    },
});

export const deleteFile = mutation({
    args: {
        fileId: v.id('files'),
    },
    handler: async (ctx, args) => {
        const { fileId } = args;
        return await ctx.db.delete(fileId);
    },
});

export const duplicateFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.string(),
        teamName: v.string(),
        authorId: v.string(),
        authorEmail: v.string(),
        isPrivate: v.boolean(),
        document: v.string(),
        canvas: v.string(),
        isArchieved: v.boolean(),
        collaborators: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('files', {
            ...args,
            lastEditedAt: Date.now(),
            fileName: `Copy of ${args.fileName}`,
        });
    },
});

export const addCollaborator = mutation({
    args: {
        fileId: v.id('files'),
        host: v.string(),
        collaboratorMail: v.string(),
    },
    handler: async (ctx, args) => {
        const { host, fileId } = args;
        const file = await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('_id'), fileId))
            .unique();
        if (!file) {
            return {
                error: 'Oops! No such file have been found',
                data: null,
            };
        }

        const author = file.authorEmail;

        // Hosts Validation
        if (!author || author !== host) {
            return {
                error: 'Oops! You do not have any previlage to invite people on the team. Only Author of the file can add collaborators.',
                data: null,
            };
        }

        // Host's validation success
        // Check if invitee is already in the list or not
        const collaboratorsMails = file.collaborators;
        const ifAlreadyInvited = collaboratorsMails.find(
            (c: any) => c.email === args.collaboratorMail,
        );

        if (ifAlreadyInvited) {
            return {
                error: `User with email ${args.collaboratorMail} has been already invited to this team`,
                data: null,
            };
        }

        // Add the collaborator to the team
        try {
            await ctx.db.patch(args.fileId, {
                collaborators: [
                    ...collaboratorsMails,
                    {
                        email: args.collaboratorMail,
                        isAdmin: false,
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
