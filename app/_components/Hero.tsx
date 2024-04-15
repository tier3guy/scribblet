'use client';
import Badge from '@/components/Badge';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Link from 'next/link';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function Hero() {
    const { user } = useKindeBrowserClient();

    return (
        <div className='bg-white w-full h-screen grid place-content-center'>
            <div className='flex flex-col items-center gap-6'>
                <Badge label='Engineering Documenting Platform' />

                <div>
                    <h1 className='text-center w-2/3 font-bold text-6xl m-auto leading-[1.2em]'>
                        Documents & <span className='text-orange-500'>diagrams</span> for{' '}
                        <span className='text-gray-400'>engineering</span> teams
                    </h1>
                    <p className='mt-4 text-lg text-center'>
                        All-in-one markdown editor, collaborative canvas, and diagram-as-code
                        builder
                    </p>
                </div>

                <div className='flex items-center gap-3'>
                    <Link href={user ? '/dashboard' : '/api/auth/login'}>
                        <PrimaryButton
                            label='Try Scribblet for free'
                            className='bg-orange-500 transition-all hover:bg-orange-600 text-white'
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
