'use client';
import Navbar from './_components/Navbar';
import Document from './_components/Document';
import Canvas from './_components/Canvas';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Dialog } from '@/components/ui/dialog';
import RenameDialogBox from './_components/dialogs/RenameDialogBox';
import useWorkspace from '@/hooks/useWorkspace';
import { useRouter } from 'next/navigation';

export default function Workspace() {
    const { file } = useWorkspace();
    const RIDIRECTION_TIME = 5; // seconds
    const [timer, setTimer] = useState<number>(RIDIRECTION_TIME);
    const [timerActivated, setTimerActivated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (timerActivated) {
            if (timer > 0) {
                interval = setInterval(() => {
                    setTimer((prev) => prev - 1);
                }, 1000);
            } else {
                router.push('/dashboard');
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timerActivated, timer, setTimer, router]);

    useEffect(() => {
        if (file) toast('Your workspace is ready to use. You can start editing now !');
        else setTimerActivated(true);
    }, [file]);

    if (!file) {
        return (
            <div className='h-screen w-screen grid place-content-center'>
                <p className='text-2xl font-bold text-orange-500 text-center'>
                    Oops! File not found
                </p>
                <p className='text-center mt-2 text-sm'>
                    Redirecting you to the dashboard in {timer} seconds ...
                </p>
            </div>
        );
    }
    return (
        <Dialog>
            <Tabs defaultValue='Both' className='h-screen w-screen overflow-hidden flex flex-col'>
                <div className='w-full z-50'>
                    <Navbar />
                </div>
                <div className='flex-1 overflow-hidden'>
                    <TabsContent value='Document' className='h-full'>
                        <Document />
                    </TabsContent>
                    <TabsContent value='Canvas' className='h-full'>
                        <Canvas />
                    </TabsContent>
                    <TabsContent value='Both' className='h-full p-0'>
                        <ResizablePanelGroup direction='horizontal'>
                            <ResizablePanel maxSize={75}>
                                <Document />
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel maxSize={75}>
                                <Canvas />
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </TabsContent>
                </div>
            </Tabs>
            <RenameDialogBox file={file} />
        </Dialog>
    );
}
