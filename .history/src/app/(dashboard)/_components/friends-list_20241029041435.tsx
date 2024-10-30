import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

const useTestUsers = () => {
    const user = useQuery(api.functions.user.get);
    if (!user) {
        return [];
    }
    return [user, user, user, user, user]
}

export function PendingFriendsList() {
    return {
        < div className = "flex flex-col divide-y" >
        
        </ >
    }
}