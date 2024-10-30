/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2Icon, CheckIcon, MessageCircleIcon, XIcon } from "lucide-react";
import { DropdownMenu } from '@/components/ui/dropdown-menu';

const useTestUsers = () => {
    const user = useQuery(api.functions.user.get);
    if (!user) {
        return [];
    }
    return [user, user, user, user, user]
}

export function PendingFriendsList() {
    const users = useTestUsers();
    return (
        <div className="flex flex-col divide-y" >
            <h2 className="text-sm text-muted-foreground p-2.5">Pending Friends</h2>
            {users.map((user) => (
                <FriendItem key={user.username} username={user.username} image={user.image}>
                    <Button className="rounded-full text-green-100" variant="outline" size="icon">
                        <CheckIcon />
                        <span className="sr-only">Accept</span>
                    </Button>
                    <Button className="rounded-full" variant="outline" size="icon">
                        <XIcon />
                        <span className="sr-only">Reject</span>
                    </Button>
                </FriendItem>
            ))}
        </div>
    )
}

export function AcceptedFriendsList() {
    const users = useTestUsers();
    return (
        <div className="flex flex-col divide-y" >
            <h2 className="text-sm text-muted-foreground p-2.5">Accepted Friends</h2>
            {users.map((user) => (
                <FriendItem key={user.username} username={user.username} image={user.image}>
                    <Button className="rounded-full" variant="outline" size="icon">
                        <MessageCircleIcon />
                        <span className="sr-only">Start DM</span>
                    </Button>
                    <Button className="rounded-full" variant="outline" size="icon">
                        <XIcon />
                        <span className="sr-only">Remove Friend</span>
                    </Button>
                </FriendItem>
            ))}
        </div>
    )
}


function FriendItem({
    username,
    image,
    children
}: {
    username: string,
    image: string,
    children?: React.ReactNode
}) {
    return (
        <div className="flex items-center p-2.5 gap-2.5 justify-between">
            <div className="flex items-center gap-2.5 ">
                <Avatar className="size-9 border">
                    <AvatarImage src={image} />
                    <AvatarFallback />
                </Avatar>
                <p className="text-sm font-medium">{username}</p>

            </div>
            <div className="flex items-center gap-1 space-x-2">
                {children}
            </div>
        </div>

    )
}