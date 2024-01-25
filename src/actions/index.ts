//  to make sure the functions exported from this file are treated as SERVER ACTIONS =>
'use server';
import { redirect } from 'next/navigation';

import { db } from '@/db';

//  define server action
export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: { id },
        data: { code },
    });

    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {
            id,
        },
    });

    redirect('/');
}
