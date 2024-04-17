import PrimaryButton from '@/components/Buttons/PrimaryButton';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import useDashboard from '@/hooks/useDashboard';
import { IFile } from '@/types/file.type';
import { useConvex } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface IRenameDialogBox {
    file: IFile;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RenameDialogBox({ file, setOpen }: IRenameDialogBox) {
    const convex = useConvex();
    const { getAllTeamFiles } = useDashboard();
    const [fileName, setFileName] = useState<string>(file?.fileName || '');

    const handleRenameFile = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.updateFileName, {
                    fileId: file._id,
                    fileName,
                });
                toast('Your file has been renamed successfully.');
            }
            setOpen(false);
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            getAllTeamFiles();
        }
    };

    return (
        <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
                <DialogTitle>Rename File</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you are done.
                </DialogDescription>
            </DialogHeader>
            <div
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    className='w-full outline-none border-[1.5px] text-sm p-2 rounded border-black'
                    value={fileName}
                    onChange={(e) => {
                        setFileName(e.target.value);
                    }}
                />
            </div>
            <DialogFooter>
                <PrimaryButton
                    label='Save Changes'
                    className='text-sm bg-orange-500 hover:bg-orange-600 text-white'
                    onClick={handleRenameFile}
                />
            </DialogFooter>
        </DialogContent>
    );
}
