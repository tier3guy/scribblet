'use client';
import { useState } from 'react';
import { Check, ChevronsUpDown, LogOut, Users, Settings } from 'lucide-react';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useDashboard from '@/hooks/useDashboard';

export default function TeamsSelector() {
    const router = useRouter();
    const { teamsData, userData, selectedTeam } = useDashboard();

    const [open, setOpen] = useState<boolean>(false);

    const profile = userData?.firstName ? userData?.firstName[0] : '//';

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='ghost'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between text-md font-normal px-0 hover:bg-transparent'
                >
                    {selectedTeam
                        ? teamsData.find((team) => team._id === selectedTeam._id)?.teamName
                        : 'Select Team'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>

            <PopoverContent className='w-full p-0'>
                <Command>
                    <CommandGroup>
                        <div className='px-[1px] mt-[2px]'>
                            {teamsData.map((team) => (
                                <button
                                    key={team._id}
                                    value={team._id!}
                                    onClick={() => {
                                        router.push(`/dashboard?teamId=${team._id}`);
                                        setOpen(false);
                                    }}
                                    className='w-full flex items-center text-gray-500 text-sm  py-[6px] px-2 rounded hover:bg-gray-50'
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4 text-gray-400',
                                            selectedTeam?._id === team._id
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {team.teamName}
                                </button>
                            ))}
                        </div>
                    </CommandGroup>

                    <CommandGroup className='flex flex-col'>
                        <div className='flex flex-col gap-[2px] px-[1px] py-2 border-t-[1px]'>
                            <SelectorButton
                                label='Create or Join Team'
                                icon={<Users className='text-gray-400' size='18' />}
                                onClick={() => {
                                    router.push('/teams/create-team');
                                }}
                            />

                            <SelectorButton
                                label='Settings'
                                icon={<Settings className='text-gray-400' size='18' />}
                                shortcutKey='ALT + S'
                            />
                            <LogoutLink className='hover:bg-gray-50 rounded'>
                                <SelectorButton
                                    label='Logout'
                                    icon={<LogOut className='text-gray-400' size='18' />}
                                />
                            </LogoutLink>
                        </div>

                        <div className='flex items-center gap-2 px-2 py-4 border-t-[1px]'>
                            <div className='w-8 h-8 rounded-full bg-orange-500 text-white grid place-content-center'>
                                <p>{profile}</p>
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm'>
                                    {userData?.firstName} {userData?.lastName}
                                </p>
                                <p className='text-xs text-gray-400 line-clamp-1'>
                                    {userData?.email}
                                </p>
                            </div>
                        </div>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

interface ISelectorButton {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
    shortcutKey?: string;
}

function SelectorButton({
    label,
    icon = null,
    onClick = () => {},
    shortcutKey = '',
}: ISelectorButton) {
    return (
        <button
            className='flex items-center justify-between py-[6px] px-2 rounded hover:bg-gray-50'
            onClick={onClick}
        >
            <div className='flex items-center gap-2'>
                {icon}
                <p className='text-sm text-gray-500'>{label}</p>
            </div>
            {shortcutKey && <p className='text-xs text-gray-400'>{shortcutKey}</p>}
        </button>
    );
}
