import styles from './Ad.module.scss'


export default function Ad({id}: any) {


    return (
        <>
            <ins className={styles.adsbygoogle}
                data-ad-client="ca-pub-1795059575666770"
                data-ad-slot={id}
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </>
    )
}