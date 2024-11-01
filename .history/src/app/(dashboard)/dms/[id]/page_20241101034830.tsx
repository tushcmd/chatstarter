'use client'

import { use } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useQuery } from "convex/react";
import { SendIcon, TrashIcon } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";

export default function MessagePage({ params }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params)

    const user = useQuery(api.functions.user.get);

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-1 flex-col divide-y max-h-screen">
            <header className="flex items-center gap-2 p-4">
                <Avatar className="size-8 border">

                </Avatar>
            </header>
        </div>
    )
}


function MessageActions() {
    <DropdownMenu>
        <DropdownMenuContent>
            <DropdownMenuItem className="text-destructive">
                <TrashIcon />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}



function MessageInput() {
    return (
        <div className="flex items-center p-4 gap-2">
            <Input placeholder="Message" />
            <Button size="icon">
                <SendIcon />
                <span className="sr-only">Send</span>
            </Button>
        </div>
    )
} 