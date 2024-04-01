'use client';
import type { Snippet } from '@prisma/client';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
// import { editSnippet } from '@/actions';
import * as actions from '@/actions';

interface SnippetEditFormProps {
    snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);
    const handleEditorChange = (value: string = '') => {
        setCode(value);
    };
    //  calling bind to have a preloaded version of server action
    // 1 - always null, 2 - first arg of the server action, 3 - second arg of the server action
    const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

    return (
        <div>
            <Editor
                height='40vh'
                theme='vs-dark'
                language='javascript'
                defaultValue={snippet.code}
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChange}
            />
            <form action={editSnippetAction}>
                <button type='submit' className='p-2 border rounded'>
                    Save
                </button>
            </form>
        </div>
    );
}
