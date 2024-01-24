//  [id] is used to match the path - after snippets goes whatever is in the brakets for url
import { db } from '@/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface SnippetShowPageProps {
    params: {
        id: string;
    };
}

//  fetching data from the data base

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    //  get the snippet with the id
    const snippet = await db.snippet.findFirst({
        //  specify how to find
        where: { id: parseInt(props.params.id) },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <div>
            <div className='flex m-4 justify-between items-center'>
                <h1 className='text-xl font-bold'>{snippet.title}</h1>

                <div className='flex gap-4'>
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className='p-2 border rounded'
                    >
                        Edit
                    </Link>
                    <button className='p-2 border rounded'>Delete</button>
                </div>
            </div>
            <pre className='p-3 border rounded bg-gray-200'>
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}
