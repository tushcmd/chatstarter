'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { RedirectToSignIn } from "@clerk/nextjs"
import { Authenticated, Unauthenticated, useQuery } from "convex/react"
import { PlusIcon, User2Icon } from "lucide-react"
import Link from "next/link"
import { api } from "../../../convex/_generated/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    const user = useQuery(api.functions.user.get);

    if (!user) {
        return null;
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/friends">
                                        <User2Icon />
                                        Friends
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Direct Messages
                        </SidebarGroupLabel>
                        <SidebarGroupAction>
                            <PlusIcon />
                            <span className="sr-only">New Direct Message</span>
                        </SidebarGroupAction>
                    </SidebarGroup>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupContent>

                    </SidebarGroupContent>
                    <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <p>{user.username}</p>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    );
}