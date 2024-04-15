import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Raw from '@editorjs/raw';
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';
// @ts-ignore
import CheckList from '@editorjs/checklist';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Quote from '@editorjs/quote';

import { useCallback, useEffect } from 'react';
import useWorkspace from '@/hooks/useWorkspace';

export default function Editor() {
    const { documentData, editorRef } = useWorkspace();

    const initializeEditor = useCallback(() => {
        const editor = new EditorJS({
            tools: {
                header: Header,
                linkTool: LinkTool,
                raw: Raw,
                image: SimpleImage,
                checklist: CheckList,
                list: List,
                embed: Embed,
                quote: Quote,
            },
            holder: 'editorjs',
            data: documentData,
        });

        editorRef.current = editor;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        initializeEditor();
    }, [initializeEditor]);

    return (
        <div className='content ml-4'>
            <div id='editorjs' className='p-4 text-sm'></div>
        </div>
    );
}
