import '@/styles/globals.css'
import { Kanit } from 'next/font/google'
import Login from './login';

const font = Kanit({
  subsets: ['latin'],
  weight: ["400"],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
      
    </main>
  )
}
