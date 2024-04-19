'use client';
import Badge from '@/components/Badge';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Link from 'next/link';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function Hero() {
    const { user } = useKindeBrowserClient();

    return (
        <div className='bg-white w-full grid place-content-center'>
            <div className='flex flex-col items-center gap-6 mt-[10%]'>
                <div>
                    <h1 className='text-center w-2/3 font-bold text-5xl m-auto leading-[1.2em]'>
                        <span className='text-orange-500'>Scribblet</span>{' '}
                        <span className='text-gray-400'>
                            : The Ultimate Documentation and Collaboration
                        </span>{' '}
                        Platform
                    </h1>
                    <p className='mt-4 mx-auto w-1/2 text-lg text-center'>
                        Empower Your Documentation Process with Scribblet: Collaborate, Create, and
                        Customize with Ease. Join the Revolution Today!
                    </p>
                </div>

                <div className='flex items-center gap-3 mb-6'>
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
