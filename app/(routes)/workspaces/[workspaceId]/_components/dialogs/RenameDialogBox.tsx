import PrimaryButton from '@/components/Buttons/PrimaryButton';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import useWorkspace from '@/hooks/useWorkspace';
import { IFile } from '@/types/file.type';
import { useConvex } from 'convex/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface IRenameDialogBox {
    file: IFile | null;
}

export default function RenameDialogBox({ file }: IRenameDialogBox) {
    const convex = useConvex();
    const [fileName, setFileName] = useState<string>(file?.fileName || '');
    const [updating, setUpdating] = useState<boolean>(false);
    const { retrieveFile } = useWorkspace();

    const handleRenameFile = async () => {
        try {
            setUpdating(true);
            if (file && file._id) {
                await convex.mutation(api.files.updateFileName, {
                    fileId: file._id,
                    fileName,
                });
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setUpdating(false);
            toast('Your file has been renamed successfully.');
            retrieveFile();
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
                    label={updating ? 'Renaming File ...' : 'Save Changes'}
                    className='text-sm bg-orange-500 hover:bg-orange-600 text-white'
                    onClick={() => {
                        if (!updating) handleRenameFile();
                    }}
                    disabled={updating}
                />
            </DialogFooter>
        </DialogContent>
    );
}
