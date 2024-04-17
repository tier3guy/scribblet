import { IFile } from '@/types/file.type';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import useDashboard from '@/hooks/useDashboard';

interface IDeleteConfirmationDialogBox {
    file: IFile;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteConfirmationDialogBox({
    file,
    setOpen,
}: IDeleteConfirmationDialogBox) {
    const convex = useConvex();
    const { getAllTeamFiles } = useDashboard();

    const handleDeleteFile = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.deleteFile, {
                    fileId: file._id,
                });
                toast('Your file has been deleted successfully.');
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setOpen(false);
            getAllTeamFiles();
        }
    };

    return (
        <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
                <DialogTitle>Are you sure ?</DialogTitle>
                <DialogDescription>
                    Please note that once the file has been deleted you cannot retrieve it back.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <PrimaryButton
                    label='Delete'
                    className='text-sm bg-orange-500 hover:bg-orange-600 text-white'
                    onClick={handleDeleteFile}
                />
            </DialogFooter>
        </DialogContent>
    );
}
