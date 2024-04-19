import Logo from '@/components/Logo';
import { Github, HammerIcon, LinkedinIcon, Mail, Phone, TwitterIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-black py-10 px-[10%] text-white flex justify-between'>
            <div className='flex gap-8'>
                <div className='w-[250px]'>
                    <Logo className='text-3xl' />
                    <p className='text-sm text-gray-500 mt-3'>
                        The Ultimate Documentation and Collaboration Platform
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <p>Connect with the developer</p>
                    <div className='flex flex-col gap-2 text-sm text-gray-500'>
                        <Links
                            icon={<Github size={15} />}
                            label='Github'
                            href='https://www.github.com/tier3guy'
                        />
                        <Links
                            icon={<TwitterIcon size={15} />}
                            label='Twitter'
                            href='https://www.x.com/tier3guy'
                        />
                        <Links
                            icon={<LinkedinIcon size={15} />}
                            label='LinkedIn'
                            href='https://www.linkedin.com/in/avinash-gupta-3321041ba/'
                        />
                        <Links
                            icon={<Mail size={15} />}
                            label='avinashgupta.works@gmail.com'
                            href='mailto:avinashgupta.works@gmail.com'
                        />
                        <Links icon={<Phone size={15} />} label='+91 62903 06361' />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <p>Understand the Project</p>
                    <div className='flex flex-col gap-2 text-sm text-gray-500'>
                        <Links
                            icon={<Github size={15} />}
                            label='Github'
                            href='https://www.github.com/tier3guy/scribblet'
                        />
                        <Links
                            icon={<HammerIcon size={15} />}
                            label='Architecture'
                            href='https://www.x.com/tier3guy/scribblet'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4 text-end w-[200px]'>
                <p>Show your support</p>
                <p className='text-gray-500 text-sm'>
                    Love Scribblet? Fuel our passion by buying us a coffee on{' '}
                    <Link
                        href={'https://buymeacoffee.com/tier3guy'}
                        className='hover:underline text-gray-300'
                    >
                        BuyMeACoffee!
                    </Link>{' '}
                    Your support drives our innovation. Thank you!
                </p>
            </div>
        </footer>
    );
}

interface ILinks {
    icon: React.ReactNode;
    label: string;
    href?: string;
}
export function Links({ icon, label, href = '#' }: ILinks) {
    return (
        <Link href={href} target='__blank' className='flex items-center gap-1 cursor-pointer'>
            {icon}
            <p className='hover:underline'>{label}</p>
        </Link>
    );
}
