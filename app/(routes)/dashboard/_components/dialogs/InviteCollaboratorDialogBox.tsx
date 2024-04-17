import {
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import useDashboard from '@/hooks/useDashboard';
import { useState } from 'react';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function InviteCollaboratorDialogBox() {
    const [collaboratorAdded, setCollaboratorAdded] = useState<boolean>(false);

    return (
        <DialogContent>
            {collaboratorAdded ? (
                <ShareTeamLinkComponent />
            ) : (
                <InviteCollaboratorComponent setCollaboratorAdded={setCollaboratorAdded} />
            )}
        </DialogContent>
    );
}

interface IInviteCollaboratorComponent {
    setCollaboratorAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

function InviteCollaboratorComponent({ setCollaboratorAdded }: IInviteCollaboratorComponent) {
    const convex = useConvex();
    const [collaboratorMail, setCollaboratorMail] = useState<string>('');
    const { selectedTeam, userData } = useDashboard();
    const handleAddCollaborator = async () => {
        try {
            const result = await convex.mutation(api.teams.addCollaborator, {
                teamId: selectedTeam?._id || '',
                host: userData?.email || '',
                collaboratorMail: collaboratorMail,
                isAdmin: false,
            });
            if (result?.error) {
                toast(`Oops ! ${result?.error}`);
            } else {
                setCollaboratorAdded(true);
                toast('Hurrah !, Your collaborator has been added to the team');
            }
        } catch (error) {
            console.log(error);
            toast('Oops, something went wrong !');
        }
    };
    return (
        <DialogHeader>
            <DialogTitle>Enter the Email ID of the Collaborator</DialogTitle>
            <DialogDescription>
                Please add the email of the person who you want to invite
            </DialogDescription>

            <div
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    className='w-full outline-none border-[1.5px] text-sm p-2 rounded border-black mt-8'
                    value={collaboratorMail}
                    placeholder='johndoe@scribblet.in'
                    onChange={(e) => {
                        setCollaboratorMail(e.target.value);
                    }}
                />
            </div>
            <DialogFooter>
                <PrimaryButton
                    label='Add Collaborator'
                    className='text-sm bg-orange-500 hover:bg-orange-600 text-white'
                    onClick={handleAddCollaborator}
                />
            </DialogFooter>
        </DialogHeader>
    );
}
function ShareTeamLinkComponent() {
    const { selectedTeam } = useDashboard();

    const sharableLink: string = `http://localhost:3000/dashboard?teamId=${selectedTeam?._id}`;
    const quote: string = `Hey, you have been added to ${selectedTeam?.teamName} on Scribblet. Check it out here!`;

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
        <>
            <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
            </DialogHeader>
            <div
                onClick={(e) => {
                    e.preventDefault();
                }}
                className='w-full'
            >
                <div className='flex items-center gap-3'>
                    <p className='bg-orange-50 py-1 px-3 rounded text-xs'>{sharableLink}</p>
                    <Copy
                        className='h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-600'
                        onClick={handleCopyLink}
                    />
                </div>
                <div className='mt-8'>
                    <p className='text-sm text-gray-500'>
                        Share the team link via email or social media for easy access.
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
        </>
    );
}
