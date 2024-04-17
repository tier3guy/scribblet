import { IFile } from '@/types/file.type';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'next-share';

interface IShareDialogBox {
    file: IFile;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShareDialogBox({ file }: IShareDialogBox) {
    const sharableLink: string = `http://localhost:3000/workspaces/${file._id}`;
    const quote: string =
        'Hey, try scribblet your all in one engineering documentation management platform.';

    const handleCopyLink = async () => {
        try {
            const link = sharableLink;
            await navigator.clipboard.writeText(link);
            toast('Link has been copied to you clipboard.');
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
            </DialogHeader>
            <div
                onClick={(e) => {
                    e.preventDefault();
                }}
                className='w-full'
            >
                <div className='flex items-center gap-3'>
                    <p className='bg-orange-50 py-1 px-3 rounded text-xs line-clamp-1'>{`http://localhost:3000/workspaces/${file._id}`}</p>
                    <Copy
                        className='h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-600'
                        onClick={handleCopyLink}
                    />
                </div>
                <div className='mt-8'>
                    <p className='text-sm text-gray-500'>
                        or, try sharing the link on your socials
                    </p>

                    <div className='flex items-center gap-2 mt-3'>
                        <FacebookShareButton
                            url={sharableLink}
                            quote={quote}
                            hashtag={'#scribblet'}
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>

                        <PinterestShareButton url={sharableLink} media={quote}>
                            <PinterestIcon size={32} round />
                        </PinterestShareButton>

                        <RedditShareButton url={sharableLink} title={quote}>
                            <RedditIcon size={32} round />
                        </RedditShareButton>

                        <TelegramShareButton url={sharableLink} title={quote}>
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>

                        <WhatsappShareButton url={sharableLink} title={quote}>
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}
