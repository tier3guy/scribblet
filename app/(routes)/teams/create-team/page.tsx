'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useState } from 'react';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Logo from '@/components/Logo';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateTeam() {
    const convex = useConvex();
    const router = useRouter();
    const { user } = useKindeBrowserClient();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>('');

    const createTeamHandler = async (teamName: string) => {
        try {
            setIsLoading(true);
            const result = await convex.mutation(api.teams.createTeam, {
                kindeId: user?.id || '',
                teamName,
            });

            if (result) {
                router.push(`/dashboard?teamId=${result}`);
                toast('Your Team has been created successfully.', {
                    description:
                        'Feel free to invite other collaborators to join your projects. You can also start creating files to initiate your engineering drawing board and documentation tasks effortlessly.',
                    descriptionClassName: 'mt-2',
                    className: 'text-orange-500',
                });
            }
            return result;
        } catch (error) {
            toast('Uhh ohh, Team creation failed!', {
                description:
                    'Team with the same team name already exists. Try giving some new names',
                descriptionClassName: 'mt-2',
                className: 'text-orange-500',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user && user?.given_name) setTeamName(user.given_name + "'s Team");
    }, [user]);

    return (
        <div className='h-screen w-screen flex flex-col'>
            <div className='p-4'>
                <Logo className='bg-black py-2 px-8 rounded-full' />
            </div>
            <div className='flex flex-col items-center py-16'>
                <div>
                    <h1 className='text-center font-bold text-4xl m-auto leading-[1.2em]'>
                        What should we call your <span className='text-orange-500'>team</span> ?
                    </h1>
                    <p className='mt-2 text-center'>
                        You can always change this later from settings.
                    </p>
                </div>
                <div className='mt-10 flex flex-col gap-2'>
                    <label htmlFor='teamName'>
                        <p>Team Name</p>
                    </label>
                    <input
                        value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value);
                        }}
                        className='w-[500px] px-4 py-2 border-gray-500 border-[1.5px] focus:outline-orange-500 rounded-md'
                    />
                </div>

                <PrimaryButton
                    label='Create Team'
                    onClick={() => {
                        createTeamHandler(teamName);
                    }}
                    className='bg-orange-500 transition-all hover:bg-orange-600 text-white mt-4'
                    disabled={teamName === ''}
                    loading={isLoading}
                />
            </div>
        </div>
    );
}
