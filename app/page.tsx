import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import styles from './articles.module.scss'
import invariant from 'tiny-invariant';
import Head from 'next/head'

invariant(process.env.SUPABASE_URL, 'Missing env var: SUPABASE_URL')
invariant(process.env.SUPABASE_KEY, 'Missing env var: SUPABASE_KEY')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function getArticles() {
    let { data: articles, error } = await supabase
        .from('articles')
        .select('*')

    return articles ?? []
}

function convertTags(tags: string) {
    return tags.split(',').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')
}


export default async function ArticlesPage() {
    const articles = await getArticles()

    return (
        <>
            <Head>
                <title>Learn to Code - Helpful Articles on How to Code</title>
            </Head>
            <div className={ styles.container}>
                <h1>Articles</h1>
                <div className={ styles.articles}>
                    {articles.map((article) => (
                        <Link href={"articles/" + article.id} key={article.id}>
                            <div className={ styles.article } key={article.id}>
                                <h2>{article.title}</h2>
                                <p>{article.description}</p>
                                <span>{convertTags(article.tags)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}