
import { createClient } from '@supabase/supabase-js'
import * as matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'
import styles from './article.module.scss'
import Markdown from '@/components/Markdown/Markdown';
import Head from './head';
import Giscus from '@giscus/react';
import Comments from '@/components/Comments/Comments';
import invariant from 'tiny-invariant';
import Image from 'next/image';
import Loading from './loading';

invariant(process.env.SUPABASE_URL, 'Missing env var: SUPABASE_URL')
invariant(process.env.SUPABASE_KEY, 'Missing env var: SUPABASE_KEY')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function getArticle(slug: string) {
    let { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single()
    
    return article ?? {}
}

export default async function ArticlePage({ params }: any) {
    const article = await getArticle(params.id)

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta name="description" content={article.description} />
                <meta name="og:title" property="og:title" content={article.title} />
                <meta name="og:description" property="og:description" content={article.description} />
                <meta name="og:image" property="og:image" content={'https://learntocode.blog/images/' + article.image} />
            </Head>
            <div key={article.id} className={styles.container}>
                <div className={styles.image}>
                    {article.image ? <Image
                        src={'/images/' + article.image}
                        alt={article.title}
                        fill={true}
                    /> : ''}
                </div>
                <Markdown content={article.content} />
                <Comments />
            </div>
        </>
    )
}