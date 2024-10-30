'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
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
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild><Link href="/friends"></Link></SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}