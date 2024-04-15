'use client';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { IUser } from '@/types/user.type';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Spinner from '@/components/Spinner';
import { ITeam } from '@/types/team.type';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { IFile } from '@/types/file.type';

interface IDashboardContext {
    userData: IUser | null;
    teamsData: ITeam[];
    selectedTeam: ITeam | null;
    createNewFileHandler: () => void;
    getAllTeamFiles: () => void;
    filesLoading: boolean;
    files: IFile[];
}

export const DashboardContext = createContext<IDashboardContext | undefined>(undefined);

export default function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const convex = useConvex();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useKindeBrowserClient();

    const [userData, setUserData] = useState<IUser | null>(null);
    const [teamsData, setTeamsData] = useState<ITeam[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
    const [filesLoading, setFilesLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<IFile[]>([]);

    const createUser = useCallback(async () => {
        try {
            const result = await convex.mutation(api.users.createUser, {
                kindeId: user?.id ? user?.id : '',
                email: user?.email ? user?.email : '',
                firstName: user?.given_name ? user?.given_name : '',
                lastName: user?.family_name ? user?.family_name : '',
            });

            return result;
        } catch (error) {
            console.log(error);
        }
    }, [convex, user?.email, user?.family_name, user?.given_name, user?.id]);

    const getUser = useCallback(async () => {
        try {
            if (user) {
                const result = await convex.query(api.users.getUserData, { email: user.email! });

                if (!result || result.length === 0) {
                    const ifSuccess = await createUser();
                    if (ifSuccess) {
                        const data = await convex.query(api.users.getUserData, {
                            email: user.email!,
                        });
                        setUserData(data[0]);
                    }
                } else {
                    setUserData(result[0]);
                }

                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }, [convex, createUser, user]);

    const getAllTeams = useCallback(async () => {
        try {
            const result = await convex.query(api.teams.getAllTeams, {
                kindeId: userData?.kindeId!,
            });

            if (result.length === 0) {
                router.push('/teams/create-team');
            } else {
                setTeamsData(result);
            }
        } catch (error) {
            console.log(error);
        }
    }, [convex, userData?.kindeId, router]);

    const createNewFileHandler = async () => {
        toast('Creating a new file ...');
        try {
            const result = await convex.mutation(api.files.createFile, {
                fileName: 'Untitled File',
                authorEmail: userData?.email ? userData.email : '',
                authorId: userData?.kindeId ? userData?.kindeId : '',
                teamId: selectedTeam?._id ? selectedTeam?._id : '',
                teamName: selectedTeam?.teamName ? selectedTeam?.teamName : '',
                isPrivate: false,
            });

            if (result) {
                toast('Great! Your new file has been successfully created.');
                router.push(`/workspaces/${result}`);
            }
        } catch (error) {
            toast('Uhh ohh, Something went wrong, Please try again!');
        }
    };

    const getAllTeamFiles = async () => {
        setFilesLoading(true);
        try {
            const result = await convex.query(api.files.getAllTeamFiles, {
                authorId: userData?.kindeId ? userData?.kindeId : '',
                teamId: selectedTeam?._id ? selectedTeam?._id : '',
            });
            setFiles(result);
        } catch (error) {
            toast('Uhh ohh, Error while retrieving the files.', {
                description:
                    'Possible reasons could be network issues or server problems. Please try again after some time.',
                descriptionClassName: 'mt-2',
            });
        } finally {
            setFilesLoading(false);
        }
    };

    useEffect(() => {
        if (!userData) getUser();
    }, [getUser, userData]);

    useEffect(() => {
        if (userData) {
            getAllTeams();
        }
    }, [userData, getAllTeams]);

    useEffect(() => {
        if (!teamsData.length) return;

        const teamId = searchParams.get('teamId');
        if (teamId) {
            const team = teamsData.find((t) => t._id === teamId) || null;
            setSelectedTeam(team);
        } else {
            setSelectedTeam(teamsData[0]);
        }
    }, [searchParams, teamsData]);

    const payload: IDashboardContext = {
        userData,
        teamsData,
        selectedTeam,
        createNewFileHandler,
        getAllTeamFiles,
        filesLoading,
        files,
    };

    if (teamsData.length === 0) return <DashboardLoading />;
    return <DashboardContext.Provider value={payload}>{children}</DashboardContext.Provider>;
}

function DashboardLoading() {
    return (
        <div className='h-screen w-screen grid place-content-center'>
            <div className='flex flex-col items-center gap-3'>
                <Spinner />
                <p>Fetching your account details ...</p>
            </div>
        </div>
    );
}
