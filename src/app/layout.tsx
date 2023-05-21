"use client"

import './globals.scss'
import store from "../store/store"
import { Provider } from 'react-redux'
import DashboardNav from '@/components/DashboardNav/DashboardNav'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Provider store={store}>
            <main className='flex'>
              <DashboardNav />
              <section className='w-full'>
                <Header />
                {children}
              </section>
            </main>
          </Provider>
      </body>
    </html>
  )
}
