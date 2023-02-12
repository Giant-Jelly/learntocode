import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function getArticles() {
    let { data: articles, error } = await supabase
        .from('articles')
        .select('*')

    return articles
}


export default async function ArticlesPage() {
    const articles = await getArticles()

    return (
        <div>``
            <h1>Articles</h1>
            <div>
                {articles.map((article) => (
                    <Link href={"articles/" + article.id}>
                        <div key={article.id}>
                            <p>{article.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}