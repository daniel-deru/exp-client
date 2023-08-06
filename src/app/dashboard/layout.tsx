"use client"

import DashboardNav from '@/components/DashboardNav/DashboardNav'
import Header from '@/components/Header/Header'
import styles from "./dashboard.module.scss"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main>
        <Header />
        <section className={styles.mainSection}>
            <DashboardNav />
            {children}
        </section>
    </main>
)
}
