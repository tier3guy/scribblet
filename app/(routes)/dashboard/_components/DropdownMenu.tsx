import { api } from '@/convex/_generated/api';
import useDashboard from '@/hooks/useDashboard';
import { IFile } from '@/types/file.type';
import { useConvex } from 'convex/react';
import { Link2, Pencil, Archive, Share, Copy, ArchiveRestore, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface IDropdownMenuProps {
    file: IFile;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HomeDropdownMenu({ file, open, setOpen }: IDropdownMenuProps) {
    const convex = useConvex();
    const { getAllTeamFiles } = useDashboard();

    const handleDoArchieve = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.updateArchieveStatus, {
                    fileId: file._id,
                    isArchieved: true,
                });
                toast('Your file has been archived successfully.', {
                    description: 'You can still retrive it from the archieve section.',
                });
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setOpen(false);
            getAllTeamFiles();
        }
    };

    const handleRenameFile = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.updateFileName, {
                    fileId: file._id,
                    fileName: 'Expense DB Modeling',
                });
                toast('Your file has been renamed successfully.');
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setOpen(false);
            getAllTeamFiles();
        }
    };

    if (!open) return null;
    return (
        <div className='absolute top-[80%] right-8 z-50'>
            <div className='bg-white shadow rounded p-1 min-w-[200px]'>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'>
                        <Link2 className='h-4 w-4' />
                        <p>Copy Link</p>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'>
                        <Share className='h-4 w-4' />
                        <p>Share</p>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'>
                        <Copy className='h-4 w-4' />
                        <p>Duplicate</p>
                    </div>
                    <div
                        className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'
                        onClick={handleRenameFile}
                    >
                        <Pencil className='h-4 w-4' />
                        <p>Rename</p>
                    </div>
                    <div
                        className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'
                        onClick={handleDoArchieve}
                    >
                        <Archive className='h-4 w-4' />
                        <p>Archieve</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ArchiveDropdownMenu({ file, open, setOpen }: IDropdownMenuProps) {
    const convex = useConvex();
    const { getAllTeamFiles } = useDashboard();
    const handleUndoArchieve = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.updateArchieveStatus, {
                    fileId: file._id,
                    isArchieved: false,
                });
                toast('Your file has been unarchived successfully.', {
                    description: 'You can still retrive it from the archieve section.',
                });
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setOpen(false);
            getAllTeamFiles();
        }
    };

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

    if (!open) return null;
    return (
        <div className='absolute top-[80%] right-8 z-50'>
            <div className='bg-white shadow rounded p-1 min-w-[200px]'>
                <div className='flex flex-col'>
                    <div
                        className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'
                        onClick={handleUndoArchieve}
                    >
                        <ArchiveRestore className='h-4 w-4' />
                        <p>Unarchieve</p>
                    </div>
                    <div
                        className='flex items-center gap-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-400 cursor-pointer px-3 py-2 rounded'
                        onClick={handleDeleteFile}
                    >
                        <Trash className='h-4 w-4' />
                        <p>Delete Permanently</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DropdownMenu(props: IDropdownMenuProps) {
    const { activeTab } = useDashboard();
    if (activeTab === 'Home') return <HomeDropdownMenu {...props} />;
    else if (activeTab === 'Archive') return <ArchiveDropdownMenu {...props} />;
    return null;
}
