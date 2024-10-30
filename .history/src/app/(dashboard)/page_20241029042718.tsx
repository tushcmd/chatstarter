import { Button } from "@/components/ui/button";
import { PendingFriendsList } from "./_components/friends-list";



export default function FriendsPage() {
    return (
        <div className="flex-1 flex-col flex divide-y">
            <header className="flex items-center justify-between p-4">
                <h1 className="font-semibold">Friends</h1>
                <Button size="sm">Add Friend</Button>
            </header>
            <div className="grid p-4 gap-4">
                <PendingFriendsList />
            </div>
        </div>
    );
}