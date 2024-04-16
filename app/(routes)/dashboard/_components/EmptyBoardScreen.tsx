import useDashboard from '@/hooks/useDashboard';
import Image from 'next/image';

export default function EmptyBoardScreen() {
    const { activeTab, setActiveTab } = useDashboard();

    return (
        <div className='h-full grid place-content-center'>
            <div className='flex flex-col items-center gap-2'>
                <Image src={'/no-data.svg'} alt='not-data-found' width={300} height={300} />
                {activeTab === 'Home' ? (
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
                ) : (
                    <div className='text-sm rounded-full py-1 px-6'>
                        This folder is empty. Go back to{' '}
                        <span
                            className='text-orange-600 underline cursor-pointer'
                            onClick={() => {
                                setActiveTab('Home');
                            }}
                        >
                            Home
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
