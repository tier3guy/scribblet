import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConvexClientProvider from '@/context/ConvexClientProvider';
import { Toaster } from '@/components/ui/sonner';
import { Dialog } from '@/components/ui/dialog';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Scribblet',
    description:
        'Scribblet is an open-source platform designed to revolutionize the way you create, collaborate, and manage documentation. Built with a focus on flexibility and functionality, Scribblet combines markdown documentation with dynamic image illustrations using an integrated draw board feature.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='scroll-smooth'>
            <head>
                <link href='/favicon.svg' rel='icon' type='image/svg' />
                <link rel='apple-touch-icon' href='/favicon.svg' type='image/svg' />
            </head>
            <body className={inter.className}>
                <Suspense>
                    <TooltipProvider>
                        <Dialog>
                            <ConvexClientProvider>{children}</ConvexClientProvider>
                        </Dialog>
                    </TooltipProvider>
                    <Toaster />
                </Suspense>
            </body>
        </html>
    );
}
