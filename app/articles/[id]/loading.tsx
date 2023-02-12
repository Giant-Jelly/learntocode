'use client'

import { Oval } from 'react-loader-spinner'
import styles from './article.module.scss'

export default function Loading() {
    return (
        <div className={ styles.loader }>
            <Oval
                height={80}
                width={80}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            
            />
        </div>
    );
}
