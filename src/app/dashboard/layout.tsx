"use client"

import { useEffect } from 'react'

import DashboardNav from '@/components/DashboardNav/DashboardNav'
import Header from '@/components/Header'
import { call } from '@/utils/call'
import { setActivities } from '@/store/slices/activitySlice'
import { useAppDispatch } from '@/store/hooks'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const dispatch = useAppDispatch()

  async function fetchActivities(){
    const activities = await call("/activity/all?includeItems=true", "GET")
    console.log(activities)
    if(activities.error) return activities.error

    dispatch(setActivities(activities.data))

  }

  useEffect(() => {
    fetchActivities()
  }, [])
  
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
