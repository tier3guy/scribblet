import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Logo from '@/components/Logo';
import useWorkspace from '@/hooks/useWorkspace';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { CircleDot } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import InviteCollaboratorDialogBox from './dialogs/InviteFileCollaborator';

export default function Navbar() {
    const { tabsItems, fileName } = useWorkspace();
    const [savingIndicator, setSavingIndicator] = useState<boolean>(false);
    const SAVING_INDICATOR_TOGGLE_TIME = 3000;

    const toggleSavingIndicator = () => {
        setSavingIndicator((prev) => !prev);
    };

    useEffect(() => {
        const interval = setInterval(toggleSavingIndicator, SAVING_INDICATOR_TOGGLE_TIME);
        return () => {
            clearInterval(interval); // Clean up
        };
    }, []);

    return (
        <div className='flex items-center justify-between py-2 px-6 relative bg-black text-gray-200'>
            <div className='flex items-center gap-3'>
                <Logo varient='circle' />
                <p>{fileName}</p>
            </div>

            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4'>
                <TabsList className='rounded-full'>
                    {tabsItems.map((tab: string, index: number) => {
                        if (tab === 'Canvas' || tab === 'Document') {
                            return (
                                <Tooltip key={index}>
                                    <TooltipTrigger className='text-sm font-medium px-4 cursor-not-allowed'>
                                        {tab}
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-gray-50 max-w-[250px] p-4 shadow'>
                                        <p className='text-black'>
                                            We are sorry but we are working on the{' '}
                                            <span className='text-orange-600'>
                                                Only Canvas Mode
                                            </span>{' '}
                                            &{' '}
                                            <span className='text-orange-600'>
                                                Only Document Mode
                                            </span>
                                            . Till then please wait for the next release.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        }
                        return (
                            <TabsTrigger key={index} value={tab} className='rounded-full'>
                                <p>{tab}</p>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
            </div>

            <div className='flex items-center gap-2'>
                <p
                    className={`transition-all duration-300 text-sm px-2 flex items-center gap-1 text-gray-400 ${savingIndicator ? 'opacity-100' : 'opacity-0'}`}
                >
                    <CircleDot className='h-4 w-4 text-gray-400' />
                    Saving
                </p>
                <Dialog>
                    <DialogTrigger>
                        <PrimaryButton
                            className='text-sm bg-orange-500 hover:bg-orange-400 text-white py-2'
                            label='Invite'
                        />
                        <InviteCollaboratorDialogBox />
                    </DialogTrigger>
                </Dialog>
            </div>
        </div>
    );
}
