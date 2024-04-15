'use client';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Logo from '@/components/Logo';
import Link from 'next/link';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (path: string) => {
        return path === pathname;
    };

    const navlinks = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Features',
            path: '/features',
        },
        {
            name: 'About',
            path: '/about',
        },
        {
            name: 'Pricing',
            path: '/pricing',
        },
        {
            name: 'Blog',
            path: '/blog',
        },
        {
            name: 'Use Cases',
            path: '/use-cases',
        },
    ];

    return (
        <nav className='absolute top-0 left-0 w-full px-6 md:px-[10%] py-4 z-50'>
            <div className='bg-black rounded-full px-4 ps-10 py-3 flex items-center justify-between shadow-lg'>
                <Logo />
                <div className='flex items-center gap-4'>
                    {navlinks.map((navlink, index) => (
                        <Link
                            href={navlink.path}
                            key={index}
                            className={
                                isActive(navlink.path)
                                    ? 'bg-orange-500 text-white rounded-full py-2 px-6'
                                    : 'text-gray-300 transition-all hover:text-white'
                            }
                        >
                            <p className='text-sm'>{navlink.name}</p>
                        </Link>
                    ))}
                </div>
                <div className='flex items-center gap-3 text-sm text-white'>
                    <LoginLink>
                        <p className='border-e-2 border-gray-500 pe-3'>Login</p>
                    </LoginLink>
                    <RegisterLink>
                        <PrimaryButton
                            label='Sign up'
                            className='transition-all hover:bg-gray-100'
                        />
                    </RegisterLink>
                </div>
            </div>
        </nav>
    );
}
