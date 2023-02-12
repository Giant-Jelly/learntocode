import { createClient } from '@supabase/supabase-js'
import * as matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'
import styles from './article.module.scss'
import Markdown from '@/components/Markdown/Markdown';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function getArticle(id) {
    let { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)

    return articles[0]
}

export default async function ArticlePage({ params }) {
    const article = await getArticle(params.id)


    return (
        <div key={article.id} className={styles.container}>
            <Markdown content={article.content} />
        </div>
    )
}