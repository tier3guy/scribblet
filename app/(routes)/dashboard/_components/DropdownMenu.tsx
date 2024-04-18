import { api } from '@/convex/_generated/api';
import useDashboard from '@/hooks/useDashboard';
import { IFile } from '@/types/file.type';
import { useConvex } from 'convex/react';
import {
    Link2,
    Pencil,
    Archive,
    Share,
    Copy,
    ArchiveRestore,
    Trash,
    Lock,
    Globe,
} from 'lucide-react';
import { toast } from 'sonner';
import { DialogTrigger, Dialog } from '@/components/ui/dialog';
import RenameDialogBox from './dialogs/RenameDialogBox';
import DeleteConfirmationDialogBox from './dialogs/DeleteConfirmationDialogBox';
import ShareDialogBox from './dialogs/ShareDialogBox';

interface IDropdownMenuProps {
    file: IFile;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function HomeDropdownMenu({ file, open, setOpen }: IDropdownMenuProps) {
    const convex = useConvex();
    const { getAllTeamFiles, userData } = useDashboard();

    const isAdmin = file?.authorEmail === userData?.email;

    const handleDoArchieve = async () => {
        try {
            toast('Archieving ...');
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

    const handleCopyLink = async () => {
        try {
            const link = `http://localhost:3000/workspaces/${file._id}`;
            await navigator.clipboard.writeText(link);
            toast('Link has been copied to you clipboard.');
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setOpen(false);
        }
    };

    const handleDuplicateFile = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.duplicateFile, {
                    fileName: file?.fileName || '',
                    teamId: file?.teamId || '',
                    teamName: file?.teamName || '',
                    authorId: userData?.kindeId || '',
                    authorEmail: userData?.email || '',
                    isPrivate: file?.isPrivate || false,
                    isArchieved: file?.isArchieved || false,
                    document: file?.document || '',
                    canvas: file?.canvas || '',
                    collaborators: file?.collaborators || [],
                });
                toast('Duplicate file has been created successfully.');
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        } finally {
            setOpen(false);
            getAllTeamFiles();
        }
    };

    const handleTogglePrivateStatus = async () => {
        try {
            if (file._id) {
                await convex.mutation(api.files.updatePrivateStatus, {
                    fileId: file._id,
                    isPrivate: file?.isPrivate ? false : true,
                });
                toast(
                    `Your file has been moved to ${file?.isPrivate ? 'public' : 'private'} domain successfully.`,
                );
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
                        onClick={handleCopyLink}
                    >
                        <Link2 className='h-4 w-4' />
                        <p>Copy Link</p>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <div className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'>
                                <Share className='h-4 w-4' />
                                <p>Share</p>
                            </div>
                            <ShareDialogBox file={file} open={open} setOpen={setOpen} />
                        </DialogTrigger>
                    </Dialog>
                    <div
                        className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'
                        onClick={handleDuplicateFile}
                    >
                        <Copy className='h-4 w-4' />
                        <p>Duplicate</p>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <div className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'>
                                <Pencil className='h-4 w-4' />
                                <p>Rename</p>
                            </div>
                            <RenameDialogBox file={file} open={open} setOpen={setOpen} />
                        </DialogTrigger>
                    </Dialog>
                    {isAdmin && (
                        <div
                            className='flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 rounded'
                            onClick={handleTogglePrivateStatus}
                        >
                            {file?.isPrivate ? (
                                <Globe className='h-4 w-4' />
                            ) : (
                                <Lock className='h-4 w-4' />
                            )}
                            <p>{file?.isPrivate ? 'Make Public' : 'Make Private'}</p>
                        </div>
                    )}
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
                    <DialogTrigger>
                        <div className='flex items-center gap-3 text-sm text-gray-600 hover:bg-red-50 hover:text-red-400 cursor-pointer px-3 py-2 rounded'>
                            <Trash className='h-4 w-4' />
                            <p>Delete Permanently</p>
                        </div>
                        <DeleteConfirmationDialogBox file={file} open={open} setOpen={setOpen} />
                    </DialogTrigger>
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
