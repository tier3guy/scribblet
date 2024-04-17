import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Archive, Copy, Home, Paperclip, Pencil, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DialogTrigger } from '@/components/ui/dialog';

export default function DropDownMenu() {
    const router = useRouter();
    return (
        <DropdownMenuContent>
            <DropDownMenuItem
                label={'Dashboard'}
                icon={<Home className='h-4 w-4 text-gray-500' />}
                shortcutCommand='H'
                onClick={() => {
                    router.push('/dashboard');
                }}
            />
            <DropDownMenuItem
                label={'New File'}
                icon={<Paperclip className='h-4 w-4 text-gray-500' />}
                shortcutCommand='ALT + N'
                onClick={() => {
                    router.push('/teams/create-team');
                }}
            />
            <DropdownMenuSeparator />
            <DialogTrigger>
                <DropDownMenuItem
                    label={'Rename'}
                    icon={<Pencil className='h-4 w-4 text-gray-500' />}
                />
            </DialogTrigger>
            <DropDownMenuItem
                label={'Duplicate File'}
                icon={<Copy className='h-4 w-4 text-gray-500' />}
                shortcutCommand='CTRL + D'
            />
            <DropdownMenuSeparator />
            <DropDownMenuItem
                label={'Archive'}
                icon={<Archive className='h-4 w-4 text-gray-500' />}
            />
            <DropDownMenuItem
                label={'Settings'}
                icon={<Settings className='h-4 w-4 text-gray-500' />}
            />
        </DropdownMenuContent>
    );
}

interface IDropDownMenuItem {
    icon?: React.ReactNode;
    label: String;
    shortcutCommand?: string;
    onClick?: () => void;
}

export function DropDownMenuItem({
    icon = null,
    label,
    shortcutCommand = '',
    onClick = () => {},
}: IDropDownMenuItem) {
    return (
        <DropdownMenuItem
            className='flex items-center justify-between w-[200px] cursor-pointer hover:bg-orange-50'
            onClick={onClick}
        >
            <div className='flex items-center gap-2'>
                {icon}
                <p className='text-sm text-gray-500'>{label}</p>
            </div>
            <p className='text-xs text-gray-400'>{shortcutCommand}</p>
        </DropdownMenuItem>
    );
}
