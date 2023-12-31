"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"


interface Props {
    children: ReactNode
}

const QueryProvider: React.FC<Props> = ({children}) => {

    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider