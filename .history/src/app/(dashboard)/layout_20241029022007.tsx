'use client'

import { SidebarProvider } from "@/components/ui/sidebar"
import { RedirectToSignIn } from "@clerk/nextjs"
import { Authenticated, Unauthenticated } from "convex/react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Authenticated><SidebarProvider><DashboardSidebar />{children}</SidebarProvider></Authenticated>
            <Unauthenticated>
                <RedirectToSignIn />
            </Unauthenticated>
        </>
    )
}


function DashboardSidebar() {
    return null
}