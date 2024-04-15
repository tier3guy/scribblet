'use client';
import Board from './_components/Board';
import Sidebar from './_components/Sidebar';

export default function Dashboard() {
    return (
        <div className='flex h-screen w-screen overflow-hidden divide-x-[1.5px]'>
            <div className='h-full w-[22%]'>
                <Sidebar />
            </div>
            <div className='flex-1 h-full'>
                <Board />
            </div>
        </div>
    );
}
