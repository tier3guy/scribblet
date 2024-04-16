import useDashboard from '@/hooks/useDashboard';
import Spinner from '@/components/Spinner';
import { SquareArrowOutUpRight, Ellipsis } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { toTimeSinceString } from '@/lib/utils';
import EmptyBoardScreen from './EmptyBoardScreen';
import { IFile } from '@/types/file.type';
import DropdownMenu from './DropdownMenu';

export default function Table() {
    const { files, filesLoading } = useDashboard();
    return (
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
                            <div key={file?._id}>
                                <TableRow file={file} />
                            </div>
                        );
                    })
                ) : (
                    <EmptyBoardScreen />
                )}
            </div>
        </div>
    );
}

interface ITableRow {
    file: IFile;
}

function TableRow({ file }: ITableRow) {
    const [dropDownOpened, setDropDownOpened] = useState<boolean>(false);
    const toggleMenu = () => {
        setDropDownOpened((prev) => !prev);
    };

    return (
        <div className='flex text-sm py-3 px-6 cursor-pointer relative'>
            <div className='w-[29%] pe-4'>
                <Link href={`/workspaces/${file._id}`}>
                    <div className='flex items-center gap-1'>
                        {/* <SquareArrowOutUpRight className='w-4' /> */}
                        <p className='line-clamp-1 overflow-hidden underline'>{file.fileName}</p>
                    </div>
                </Link>
            </div>
            <div className='w-[25%] pe-4'>
                <p className='line-clamp-1'>{file.teamName}</p>
            </div>
            <div className='w-[14%] pe-4'>
                <p className='line-clamp-1'>
                    {file._creationTime ? toTimeSinceString(file._creationTime) : ''}
                </p>
            </div>
            <div className='w-[14%] pe-4'>
                <p className='line-clamp-1'>
                    {file.lastEditedAt ? toTimeSinceString(file.lastEditedAt) : ''}
                </p>
            </div>
            <div className='w-[14%] pe-4'>
                <p className='line-clamp-1'>{file.authorEmail || 'Unknown'}</p>
            </div>
            <div className='w-[4%]'>
                <Ellipsis
                    className='text-gray-500 hover:bg-gray-100 px-1 rounded'
                    onClick={toggleMenu}
                />
            </div>

            {/*/!* Dropdown menu *!/*/}
            <DropdownMenu file={file} open={dropDownOpened} setOpen={setDropDownOpened} />
        </div>
    );
}
