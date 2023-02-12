import { createClient } from '@supabase/supabase-js'
import * as matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'
import styles from './article.module.scss'
import Markdown from '@/components/Markdown/Markdown';
import Head from './head';
import Giscus from '@giscus/react';
import Comments from '@/components/Comments/Comments';

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseKey = process.env.SUPABASE_KEY ?? ''

const supabase = createClient(supabaseUrl, supabaseKey)

async function getArticle(id: string) {
    let { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
    
    return articles ? articles[0] : null
}

export default async function ArticlePage({ params }: any) {
    const article = await getArticle(params.id)


    return (
        <>
            <Head>
                <title>{article.title}</title>
            </Head>
            <div key={article.id} className={styles.container}>
                <Markdown content={article.content} />
                <Comments />
            </div>
        </>
    )
}