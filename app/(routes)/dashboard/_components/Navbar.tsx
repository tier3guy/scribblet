import PrimaryButton from '@/components/Buttons/PrimaryButton';
import useDashboard from '@/hooks/useDashboard';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import InviteCollaboratorDialogBox from './dialogs/InviteCollaboratorDialogBox';

export default function Navbar() {
    const { allFiles, setFiles, activeTab, setActiveTab, setFilesLoading, userData } =
        useDashboard();

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
        } else if (activeNavlink === 'All Files') {
            const _files = allFiles.filter((f) => f.isArchieved === false);
            setFiles(_files);
        } else if (activeNavlink === 'Created by Me') {
            const _files = allFiles.filter((f) => f.authorEmail === userData?.email);
            setFiles(_files);
        }

        setFilesLoading(false);
    }, [activeNavlink, allFiles, setFiles, activeTab, setFilesLoading, userData]);

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
            <Dialog>
                <DialogTrigger>
                    <PrimaryButton
                        label='Add a Collaborator'
                        className='px-8 bg-black text-white hover:bg-slate-900 text-sm'
                    />
                </DialogTrigger>
                <InviteCollaboratorDialogBox />
            </Dialog>
        </div>
    );
}
