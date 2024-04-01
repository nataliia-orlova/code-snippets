//  to make sure the functions exported from this file are treated as SERVER ACTIONS =>
'use server';
// - caching on demand
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { redirect } from 'next/navigation';

// create
export async function createSnippet(
    formState: { message: string },
    formData: FormData
) {
    try {
        //  inputs should be valid - check user's inputs
        const title = formData.get('title');
        const code = formData.get('code');
        //  validation
        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title must be longer',
            };
        }
        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code must be longer',
            };
        }
        //  create a new record in the database
        await db.snippet.create({
            data: {
                title: title,
                code: code,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message,
            };
        } else {
            return {
                message: 'Something went wrong...',
            };
        }
    }
    //  redirect user to the root route
    revalidatePath('/');
    redirect('/');
}

//  define server action
export async function editSnippet(id: number, code: string) {
    //  update data
    await db.snippet.update({
        where: { id },
        data: { code },
    });
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    //  delete data
    await db.snippet.delete({
        where: { id },
    });
    revalidatePath('/');
    redirect('/');
}
