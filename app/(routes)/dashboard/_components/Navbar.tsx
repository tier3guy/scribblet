import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useState } from 'react';

export default function Navbar() {
    const navItems = [
        {
            label: 'All Files',
            action: () => {},
        },
        {
            label: 'Recents',
            action: () => {},
        },
        {
            label: 'Created by Me',
            action: () => {},
        },
        {
            label: 'Private Files',
            action: () => {},
        },
    ];

    const [activeNavlink, setActiveNavlink] = useState<string>(navItems[0].label);

    return (
        <div className='px-4 ps-6 flex items-center justify-between mt-1'>
            <div>
                <ul className='flex items-center gap-6'>
                    {navItems.map((navItem, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveNavlink(navItem.label);
                                navItem.action();
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
