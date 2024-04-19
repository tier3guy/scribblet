import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ILogo {
    className?: string;
    varient?: 'default' | 'circle';
}

export default function Logo({ className = '', varient = 'default' }: ILogo) {
    if (varient === 'circle') {
        return (
            <Link href={'/'}>
                <div className='bg-orange-500 rounded-full h-10 w-10 text-white grid place-content-center'>
                    <span className='text-xl font-bold'>{'//'}</span>
                </div>
            </Link>
        );
    }
    return (
        <Link href={'/'}>
            <h1 className={cn('text-lg text-white', className)}>
                <span className={cn('text-xl font-bold', className)}>{'//'}</span> scribblet
            </h1>
        </Link>
    );
}
