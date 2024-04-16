import PrimaryButton from '@/components/Buttons/PrimaryButton';
import useDashboard from '@/hooks/useDashboard';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { allFiles, setFiles, activeTab, setActiveTab } = useDashboard();

    const navItems = [
        {
            label: 'All Files',
        },
        {
            label: 'Recents',
        },
        {
            label: 'Created by Me',
        },
        {
            label: 'Private Files',
        },
    ];

    const [activeNavlink, setActiveNavlink] = useState<string>(navItems[0].label);

    useEffect(() => {
        if (activeTab === 'Archive') {
            const _files = allFiles.filter((f) => f.isArchieved === true);
            setFiles(_files);
            return;
        }
        if (activeNavlink === 'All Files') {
            const _files = allFiles.filter((f) => f.isArchieved === false);
            setFiles(_files);
        }
    }, [activeNavlink, allFiles, setFiles, activeTab]);

    if (activeTab === 'Archive')
        return (
            <div className='px-4 ps-6 flex items-center justify-between mt-1'>
                <h3 className='py-4 border-b-4 border-transparent'>
                    <span
                        className='text-orange-600 cursor-pointer hover:underline'
                        onClick={() => {
                            setActiveTab('Home');
                        }}
                    >
                        Dashboard
                    </span>{' '}
                    / Archive
                </h3>
            </div>
        );
    return (
        <div className='px-4 ps-6 flex items-center justify-between mt-1'>
            <div>
                <ul className='flex items-center gap-6'>
                    {navItems.map((navItem, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveNavlink(navItem.label);
                            }}
                            className={
                                activeNavlink === navItem.label
                                    ? 'border-b-4 border-orange-500'
                                    : 'border-b-4 border-transparent'
                            }
                        >
                            <p className='py-4'>{navItem.label}</p>
                        </button>
                    ))}
                </ul>
            </div>
            <PrimaryButton
                label='Invite a Collaborator'
                className='px-8 bg-black text-white hover:bg-slate-900 text-sm'
            />
        </div>
    );
}
