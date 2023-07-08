"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/token"


export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const token = getToken()

    if(token) router.push("/dashboard")
    else if(!token) router.push("/signin")

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  )
}
