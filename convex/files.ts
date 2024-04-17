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
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('_id'), args.fileId))
            .collect();
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
