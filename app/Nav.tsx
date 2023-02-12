import Link from 'next/link'
import styles from './Nav.module.scss'


export default function Nav() {
    return (
        <div className={styles.container}>
            <div>
                <Link 
                    href="/"
                >All articles</Link>
            </div>
        </div>
    )
}