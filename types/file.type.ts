import { v } from 'convex/values';

export type IFile = {
    _id: any;
    fileName: string;
    teamId: string;
    teamName: string;
    authorId: string;
    authorEmail: string;
    isPrivate: boolean;
    _creationTime: string;
    lastEditedAt: string;
    document: string;
    canvas: string;
};
