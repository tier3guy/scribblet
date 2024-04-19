export const MODE: string = process.env.MODE || 'DEV';

export const documentPlaceholderData = {
    time: Date.now(),
    blocks: [
        {
            type: 'header',
            data: {
                text: 'Welcome to Scribblet',
                level: 2,
            },
        },
        {
            type: 'paragraph',
            data: {
                text: "Dive into the heart of engineering brilliance with Scribblet, your go-to platform for storing and crafting impeccable documentation. Whether you're sketching out complex algorithms, detailing innovative designs, or jotting down groundbreaking insights, Scribblet has got you covered. Let your ideas flow seamlessly onto the digital canvas and shape the future of engineering documentation with ease and precision.",
            },
        },
    ],
    version: '2.8.1',
};

export const DOMAIN =
    (MODE as string) === 'DEV' ? 'http://localhost:3000' : 'https://scribblet.vercel.app';
