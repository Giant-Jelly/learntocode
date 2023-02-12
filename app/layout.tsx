import styles from './layout.module.scss'
import './globals.scss'
import Nav from './Nav'
import { Roboto } from '@next/font/google'
import Footer from './Footer'

const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'] 
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={roboto.className}>
        <Nav />
        <div className={styles.container}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
