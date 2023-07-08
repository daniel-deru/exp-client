"use client"

import DashboardNav from '@/components/DashboardNav/DashboardNav'
import Header from '@/components/Header/Header'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main >
        <Header />
        <section className='w-full flex'>
            <DashboardNav />
            {children}
        </section>
    </main>
)
}
