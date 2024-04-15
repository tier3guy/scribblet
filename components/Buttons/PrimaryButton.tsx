import { cn } from '@/lib/utils';
import { TButton } from '@/types/button.type';
import { Loader2 } from 'lucide-react';

export default function PrimaryButton({
    label = 'Button',
    onClick = () => {},
    className = '',
    disabled = false,
    loading = false,
}: TButton) {
    return (
        <button
            className={cn(
                'bg-white text-black py-2 px-6 rounded-full',
                className,
                disabled && 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed',
            )}
            onClick={disabled || loading ? () => {} : onClick}
        >
            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <p>{label}</p>}
        </button>
    );
}
