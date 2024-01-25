import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snipet-edit-form';

interface SnippetEditPageProps {
    params: {
        id: string;
    };
}
//  we gonna fetch data here so make the component async
export default async function SnippetEditPage(props: SnippetEditPageProps) {
    const id = parseInt(props.params.id);

    const snippet = await db.snippet.findFirst({
        where: { id },
    });

    if (!snippet) {
        return notFound();
    }

    return (
        <div>
            <SnippetEditForm snippet={snippet} />
        </div>
    );
}
