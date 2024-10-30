/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "convex/react";
import { CheckIcon, Icon, MessageCircleIcon, XIcon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";


{/*
    const useTestUsers = () => {
    const user = useQuery(api.functions.user.get);
    if (!user) {
        return [];
    }
    return [user, user, user, user, user]
}

*/}


export function PendingFriendsList() {

    // const users = useTestUsers();
    const friends = useQuery(api.functions.friend.listPending);
    return (
        <div className="flex flex-col divide-y" >
            <h2 className="text-xs font-medium text-muted-foreground p-2.5">Pending Friends</h2>
            {friends?.length === 0 && (
                <FriendsListEmpty>
                    You dont have any pending friend requests
                </FriendsListEmpty>
            )}
            {friends?.map((friend, index) => (
                <FriendItem
                    key={index}
                    username={friend.user.username}
                    image={friend.user.image}>
                    <IconButton
                        title="Accept"
                        className="bg-green-100"
                        icon={<CheckIcon />}
                    />

                    <IconButton
                        title="Reject"
                        className="bg-red-100"
                        icon={<XIcon />}
                    />
                </FriendItem>
            ))}
        </div>
    )
}

export function AcceptedFriendsList() {
    const friends = useQuery(api.functions.friend.listAccepted);
    // const users = useTestUsers();
    return (
        <div className="flex flex-col divide-y" >
            <h2 className="text-xs font-medium text-muted-foreground p-2.5">Accepted Friends</h2>
            {friends.length === 0 && (
                <FriendsListEmpty>
                    You dont have any friends yet
                </FriendsListEmpty>)}
            {friends.map((friend, index) => (
                <FriendItem
                    key={index}
                    username={friend.user.username}
                    image={friend.user.image}
                >
                    <IconButton
                        title="Start DM"
                        icon={<MessageCircleIcon />}
                    />

                    <IconButton
                        title="Remove Friend"
                        className="bg-red-100"
                        icon={<XIcon />}
                    />
                </FriendItem>
            ))}
        </div>
    )
}


function FriendsListEmpty({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
            {children}
        </div>
    )
}


function IconButton({
    title,
    className,
    icon
}: {
    title: string,
    className?: string,
    icon: React.ReactNode
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button className={cn("rounded-full", className)} variant="outline" size="icon">
                    {icon}
                    <span className="sr-only">{title}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
        </Tooltip>
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