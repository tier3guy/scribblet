import {
    DraftingCompass,
    FolderClosed,
    FolderLock,
    HandCoins,
    NotebookPen,
    PackageOpen,
    Users,
} from 'lucide-react';

export default function Features() {
    return (
        <section className='flex flex-col gap-10 py-20 px-[10%]' id='features'>
            <h1 className='font-bold text-4xl'>
                <span className='text-orange-500'>features</span>
            </h1>
            <div>
                <div className='flex justify-between items-start gap-6'>
                    <FeaturesCard
                        icon={<NotebookPen size={30} />}
                        title='Markdown Documentation'
                        description='Create and edit markdown files effortlessly.'
                    />
                    <FeaturesCard
                        icon={<DraftingCompass size={30} />}
                        title='Integrated Draw Board'
                        description='Sketch intricate software architectures and illustrations alongside your documentation.'
                    />
                    <FeaturesCard
                        icon={<Users size={30} />}
                        title='Team Collaboration'
                        description='Establish teams and invite collaborators to work together seamlessly.'
                    />
                    <FeaturesCard
                        icon={<FolderLock size={30} />}
                        title='Private Files'
                        description='Safeguard sensitive information with private files accessible only to you and selected collaborators.'
                    />
                </div>
                <div className='flex items-start gap-6 mt-10'>
                    <FeaturesCard
                        icon={<FolderClosed size={30} />}
                        title='File Management'
                        description='Archive, unarchive, and permanently delete files with ease.'
                    />
                    <FeaturesCard
                        icon={<HandCoins size={30} />}
                        title='Free and Unlimited'
                        description='Enjoy unlimited access to all features without any charges.'
                    />
                    <FeaturesCard
                        icon={<PackageOpen size={30} />}
                        title='Open-Source'
                        description='Built using Next.js, TypeScript, Tailwind, and Convex. Contribute to our platform and help shape its future!'
                    />
                </div>
            </div>
        </section>
    );
}

interface IFeaturesCard {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function FeaturesCard({ icon, title, description }: IFeaturesCard) {
    return (
        <div className='flex flex-col w-[300px]'>
            <div className='rounded-3xl h-14 w-14 bg-orange-500 shadow-md text-white grid place-content-center'>
                {icon}
            </div>
            <div className='mt-4'>
                <h3 className=' font-semibold'>{title}</h3>
                <p className='text-sm text-gray-600 mt-1'>{description}</p>
            </div>
        </div>
    );
}
