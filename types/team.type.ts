export type ITeam = {
    _id: any;
    kindeId: string | null;
    teamName: string | null;
    _creationTime: string | null;
    collaborators: {
        email: string;
        isAdmin: boolean;
    }[];
    teamCreator: string;
};
