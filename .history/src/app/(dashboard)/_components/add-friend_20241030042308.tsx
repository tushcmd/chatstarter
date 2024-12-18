import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";





export function AddFriend() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Add Friend</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Friend</DialogTitle>
                    <DialogDescription>
                        You can add a friend by their username.
                    </DialogDescription>
                </DialogHeader>
                <form className="contents">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" placeholder="username" />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Send Friend Request</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}