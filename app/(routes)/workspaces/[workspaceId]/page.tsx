'use client';
import useWorkspace from '@/hooks/useWorkspace';
import Navbar from './_components/Navbar';
import Document from './_components/Document';
import Canvas from './_components/Canvas';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export default function Workspace() {
    const { activeTab } = useWorkspace();

    return (
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
                    <ResizablePanelGroup
                        direction='horizontal'
                        onChange={(e) => {
                            console.log(e);
                        }}
                    >
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
    );
}
