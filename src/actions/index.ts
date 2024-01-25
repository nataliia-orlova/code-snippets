//  to make sure the functions exported from this file are treated as SERVER ACTIONS =>
'use server';

import { db } from '@/db';

//  define server action
export async function editSnippet() {
    console.log('edit snippet called');
}
