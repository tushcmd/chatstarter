'use client'

import { ConvexReactClient, ConvexProvider } from "convex/react"

const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
export default function ConvexClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConvexProvider
            client={client}
        >
            {children}
        </ConvexProvider>
    )
}