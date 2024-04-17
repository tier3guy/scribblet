'use client';
import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/convex/_generated/api';
import { IFile } from '@/types/file.type';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import EditorJS from '@editorjs/editorjs';
import { documentPlaceholderData } from '@/constants';
import { isEqual } from 'lodash';

interface IWorspaceContext {
    fileId: string;
    fileName: string;
    file: IFile | null;
    tabsItems: string[];
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    documentData: any;
    setDocumentData: React.Dispatch<React.SetStateAction<any>>;
    canvasData: any;
    setCanvasData: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
    editorRef: React.MutableRefObject<EditorJS | undefined>;
    uploadCanvas: (data: any) => void;
    retrieveFile: () => void;
}

export const WorkspaceContext = createContext<IWorspaceContext | undefined>(undefined);

export default function WorkspaceProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const convex = useConvex();
    const editorRef = useRef<EditorJS>();
    const saveIntervalRef = useRef<any>();

    const fileId = pathname?.split('/')[2];

    const { user } = useKindeBrowserClient();
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<IFile | null>(null);

    const [loading, setIsLoading] = useState<boolean>(true);

    const [canvasData, setCanvasData] = useState<any>(null);
    const [documentData, setDocumentData] = useState<any>(documentPlaceholderData);

    const tabs = ['Document', 'Both', 'Canvas'];
    const [activeTab, setActiveTab] = useState<string>('Both');

    const retrieveFile = useCallback(async () => {
        if (user?.id) {
            setIsLoading(true);
            try {
                const result = await convex.query(api.files.getFile, {
                    authorId: user.id,
                    fileId,
                });
                if (result.length) {
                    setFile(result[0]);
                    setFileName(result[0].fileName);
                    setDocumentData(JSON.parse(result[0].document));
                    setCanvasData(JSON.parse(result[0].canvas));
                } else {
                    toast('Uhh ohh, File not found !');
                    router.back();
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [user, fileId, convex, router]);

    const saveDocumentData = useCallback(async () => {
        if (editorRef && editorRef.current) {
            try {
                const _document = await editorRef.current.save();

                const { time, ...restDocumentData } = documentData;
                const { time: _time, ...restCurrentData } = _document;

                if (!isEqual(restDocumentData, restCurrentData)) {
                    setDocumentData(_document);
                }
            } catch (error) {
                toast('Oops, Error occured while saving your data !');
                console.log(error);
            }
        }
    }, [documentData]);

    const uploadCanvas = useCallback(
        async (data = null) => {
            if (file?._id && !loading) {
                try {
                    await convex.mutation(api.files.updateCanvas, {
                        fileId: file._id,
                        updatedCanvas: data ? data : JSON.stringify(canvasData),
                    });
                } catch (error) {
                    toast('Oops, Error occured while saving your data !');
                    console.log(error);
                }
            }
        },
        [canvasData, file, convex, loading],
    );

    const uploadData = useCallback(async () => {
        if (!file?._id || loading) return;
        try {
            await convex.mutation(api.files.updateFile, {
                fileId: file._id,
                updatedDocument: JSON.stringify(documentData),
            });
        } catch (error) {
            toast('Oops, Error occured while saving your data !');
            console.log(error);
        }
    }, [convex, documentData, file, loading]);

    useEffect(() => {
        retrieveFile();
    }, [retrieveFile]);

    useEffect(() => {
        // Start saving every 3 seconds
        saveIntervalRef.current = setInterval(async () => {
            await saveDocumentData();
        }, 3000);

        // Cleanup: Clear the interval when the component unmounts
        return () => {
            if (saveIntervalRef.current) {
                clearInterval(saveIntervalRef.current);
            }
        };
    }, [saveDocumentData]);

    useEffect(() => {
        uploadData();
    }, [documentData, uploadData]);

    const payload: IWorspaceContext = {
        fileId,
        fileName,
        file,
        tabsItems: tabs,
        activeTab,
        setActiveTab,
        documentData,
        setDocumentData,
        canvasData,
        setCanvasData,
        loading,
        editorRef,
        uploadCanvas,
        retrieveFile,
    };

    if (loading) return <WorkspaceLoading />;
    return <WorkspaceContext.Provider value={payload}>{children}</WorkspaceContext.Provider>;
}

function WorkspaceLoading() {
    const messageUpdatesIn = 3000; // Miliseconds
    const messages: string[] = [
        'Setting up your workspace ...',
        'Loading files ...',
        'Preparing components ...',
        'Almost there ...',
    ];
    const [messageIndex, setMessageIndex] = useState<number>(0);

    useEffect(() => {
        // Update message every three seconds
        const interval = setInterval(() => {
            const lastIndex = messages.length - 1;
            if (messageIndex < lastIndex) setMessageIndex((prev) => prev + 1);
        }, messageUpdatesIn);

        // Clear interval on component unmount
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages.length, setMessageIndex]);

    return (
        <div className='h-screen w-screen grid place-content-center'>
            <div className='flex flex-col items-center gap-3'>
                <Spinner />
                <p>{messages[messageIndex] ? messages[messageIndex] : 'Almost there ...'}</p>
            </div>
        </div>
    );
}
