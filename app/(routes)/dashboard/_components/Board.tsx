import useDashboard from '@/hooks/useDashboard';
import Navbar from './Navbar';
import {
    SquareArrowOutUpRight,
    Ellipsis,
    Link as Link2,
    Pencil,
    Share,
    Archive,
} from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import { toTimeSinceString } from '@/lib/utils';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Board() {
    const { files, filesLoading, getAllTeamFiles } = useDashboard();

    useEffect(() => {
        getAllTeamFiles();
    }, [getAllTeamFiles]);

    return (
        <DropdownMenu>
            <div className='h-full w-full overflow-hidden flex flex-col divide-y-[1.5px]'>
                <div>
                    <Navbar />
                </div>
                <div className='flex-1 flex flex-col overflow-hidden'>
                    <div className='flex text-sm py-3 px-6 cursor-pointer bg-orange-50 uppercase'>
                        <div className='w-[29%]'>Name</div>
                        <div className='w-[25%]'>
                            <p className='line-clamp-1'>Location</p>
                        </div>
                        <div className='w-[14%]'>
                            <p className='line-clamp-1'>Created</p>
                        </div>
                        <div className='w-[14%]'>
                            <p className='line-clamp-1'>Edited</p>
                        </div>
                        <div className='w-[14%]'>
                            <p className='line-clamp-1'>Author</p>
                        </div>
                        <div className='w-[4%]'></div>
                    </div>
                    <div className='flex-1 overflow-y-scroll flex flex-col'>
                        {filesLoading ? (
                            <div className='flex-1 grid place-content-center'>
                                <div className='flex flex-col items-center gap-1'>
                                    <Spinner />
                                    <p>Loading all files ...</p>
                                </div>
                            </div>
                        ) : files.length ? (
                            files?.map((file) => {
                                return (
                                    <TableRow
                                        key={file?._id}
                                        fileName={file.fileName}
                                        fileId={file._id}
                                        teamName={file.teamName}
                                        createdAt={file._creationTime}
                                        lastEditedAt={file.lastEditedAt}
                                        author={file.authorEmail}
                                    />
                                );
                            })
                        ) : (
                            <div className='h-full grid place-content-center'>
                                <div className='flex flex-col items-center gap-2'>
                                    <Image
                                        src={'/no-data.svg'}
                                        alt='not-data-found'
                                        width={300}
                                        height={300}
                                    />
                                    <div className='text-center'>
                                        <p>This team contains no file. Try creating one now.</p>
                                        <p className='mt-2'>
                                            Click{' '}
                                            <span className='bg-orange-50 hover:bg-orange-100 cursor-pointer py-1 px-4 rounded-full text-xs font-medium'>
                                                ALT + N
                                            </span>{' '}
                                            to create a new file
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <DropdownMenuContent className='me-4'>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                    <Link2 className='h-4 w-4 text-gray-600' />
                    <p>Copy Link</p>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                    <Pencil className='h-4 w-4 text-gray-600' />
                    <p>Rename</p>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                    <Share className='h-4 w-4 text-gray-600' />
                    <p>Share</p>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center gap-2 cursor-pointer'>
                    <Archive className='h-4 w-4 text-gray-600' />
                    <p>Archive</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface ITableRow {
    fileName?: string;
    fileId?: string;
    teamName?: string;
    createdAt?: string;
    lastEditedAt?: string;
    author?: string;
}

function TableRow({ fileName, teamName, createdAt, lastEditedAt, author, fileId }: ITableRow) {
    return (
        <div className='flex text-sm py-3 px-6 cursor-pointer'>
            <div className='w-[29%] pe-4'>
                <Link href={`/workspaces/${fileId}`}>
                    <p className='line-clamp-1 underline flex items-center gap-1'>
                        <SquareArrowOutUpRight size={16} />
                        {fileName}
                    </p>
                </Link>
            </div>
            <div className='w-[25%] pe-4'>
                <p className='line-clamp-1'>{teamName}</p>
            </div>
            <div className='w-[14%] pe-4'>
                <p className='line-clamp-1'>{createdAt ? toTimeSinceString(createdAt) : ''}</p>
            </div>
            <div className='w-[14%] pe-4'>
                <p className='line-clamp-1'>
                    {lastEditedAt ? toTimeSinceString(lastEditedAt) : ''}
                </p>
            </div>
            <div className='w-[14%] pe-4'>
                <p className='line-clamp-1'>{author}</p>
            </div>
            <div className='w-[4%]'>
                <DropdownMenuTrigger>
                    <Ellipsis className='text-gray-500 hover:bg-gray-100 px-1 rounded' />
                </DropdownMenuTrigger>
            </div>
        </div>
    );
}
