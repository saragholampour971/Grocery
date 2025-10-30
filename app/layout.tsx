import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Footer from './(footer)/Footer'
import ReactQueryProvider from '../components/react-query/ReactQueryProvider'
import { PropsWithChildren } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoggedInUserProvider from '../components/react-query/LoggedInUserProvider'
import { CartPrefetchProvider } from '../components/react-query/CartPrefetchProvider'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Grocery App',
  description: 'grocery',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-200 max-w-[600px] m-auto')}>
        <div className={'mx-auto relative bg-white  h-full'}>
          <ReactQueryProvider>
            <LoggedInUserProvider>
              <CartPrefetchProvider>
                {children}
                <Footer />
                <ReactQueryDevtools initialIsOpen={false} />
              </CartPrefetchProvider>
            </LoggedInUserProvider>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  )
}
