import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import styles from './articles.module.scss'
import Head from './head'
import invariant from 'tiny-invariant';
import Image from 'next/image';

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
                <meta name="description" content="Learn to code with these helpful articles on how to code. Learn how to code with HTML, CSS, JavaScript, React, Python, and more!" />
                <meta name="og:title" property="og:title" content="Learn to Code - Helpful Articles on How to Code" />
                <meta name="og:description" property="og:description" content="Learn to code with these helpful articles on how to code. Learn how to code with HTML, CSS, JavaScript, React, Python, and more!" />
                <meta name="og:image" property="og:image" content="https://www.learntocode.dev/images/og-image.webp" />
            </Head>
            <div className={ styles.container}>
                <h1>Articles</h1>
                <p>Welcome to the ultimate coding hub! Here, you'll find comprehensive guides and tutorials on how to code in multiple programming languages. Whether you're a beginner or an advanced developer, our articles cover everything from the basics to the most complex topics, making it easy for you to improve your skills and reach your coding goals. Start exploring today and get ready to take your coding journey to the next level!</p>
                <div className={ styles.articles}>
                    {articles.map((article) => (
                        <Link href={"articles/" + article.slug} key={article.id}>
                            <div className={ styles.article } key={article.id}>
                                <div  className={ styles.image }>
                                    <Image
                                        src={'/images/' + article.image}
                                        alt={article.title}
                                        fill={true}
                                    />
                                </div>
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