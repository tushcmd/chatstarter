/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const useTestUsers = () => {
    const user = useQuery(api.functions.user.get);
    if (!user) {
        return [];
    }
    return [user, user, user, user, user]
}

export function PendingFriendsList() {
    return (
        <div className="flex flex-col divide-y" >
            <h2 className="text-sm text-muted-foreground">Pending Friends</h2>
        </div>
    )
}


function FriendItem({ username, image }: { username: string, image: string }) {
    return (
        <div className="flex items-center">
            <Avatar className="size-6">
                <AvatarImage src={image} />
                <AvatarFallback />
            </Avatar>

            <p className="text-sm font-medium">{username}</p>
        </div>

    )
}