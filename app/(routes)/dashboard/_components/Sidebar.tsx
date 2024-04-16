import Logo from '@/components/Logo';
import TeamsSelector from './TeamsSelector';
import { Paperclip, Archive, Github, Flag } from 'lucide-react';
import useDashboard from '@/hooks/useDashboard';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const { createNewFileHandler } = useDashboard();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            // Check if the Ctrl key and 'N' key are pressed
            if (event.altKey && event.key === 'n') {
                event.preventDefault(); // Prevent default browser behavior
                createNewFileHandler(); // Call your function here
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [createNewFileHandler]);

    return (
        <div className='h-full w-full py-3 flex flex-col justify-between'>
            <div>
                <div className='border-b-[1.5px] pb-3'>
                    <div className='flex items-center gap-3 px-4'>
                        <Logo varient='circle' />
                        <div className='flex-1'>
                            <TeamsSelector />
                        </div>
                    </div>
                </div>
                <div className='text-sm'>
                    <SidebarButton label='Getting Started' icon={<Flag size={16} />} shortcut='S' />
                    <SidebarButton
                        label='Create New File'
                        icon={<Paperclip size={16} />}
                        shortcut='ALT + N'
                        onClick={createNewFileHandler}
                    />
                    <SidebarButton label='Archive' icon={<Archive size={16} />} />
                    <SidebarButton
                        label='Github Sync [Beta]'
                        icon={<Github size={16} />}
                        disbaled={true}
                    />
                </div>
            </div>

            <div className='text-sm px-4 border-t-[1.5px] pt-2'>
                This project is <span>free</span> and{' '}
                <Link
                    href={'https://github.com/tier3guy/scribblet'}
                    target='__blank'
                    className='text-orange-500  cursor-pointer hover:underline'
                >
                    Open-Sourced
                </Link>
                . If you want to support this project kindly visit{' '}
                <Link
                    href={'https://www.buymeacoffee.com/tier3guy'}
                    target='__blank'
                    className='text-orange-500 cursor-pointer hover:underline'
                >
                    here
                </Link>
                .
            </div>
        </div>
    );
}

interface ISidebarButton {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    disbaled?: boolean;
    shortcut?: string;
}

function SidebarButton({
    label,
    icon = null,
    shortcut = '',
    onClick = () => {},
    active = false,
    disbaled = false,
}: ISidebarButton) {
    return (
        <button
            className={`w-full flex items-center justify-between p-4 py-3  ${active ? 'bg-orange-500 text-white' : 'hover:bg-gray-50'} ${disbaled ? 'text-gray-500 cursor-not-allowed' : ''}`}
            onClick={disbaled ? () => {} : onClick}
        >
            <div className='flex items-center gap-2'>
                {icon}
                <p className='text-sm'>{label}</p>
            </div>
            <p className='text-xs text-gray-500'>{shortcut}</p>
        </button>
    );
}
