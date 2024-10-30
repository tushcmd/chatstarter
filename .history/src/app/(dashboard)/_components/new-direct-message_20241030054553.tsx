import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
// import { useMutation } from "convex/react";
// import { useState } from "react";
// import { toast } from "sonner";
// import { api } from "../../../../convex/_generated/api";


export function NewDirectMessage() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <PlusIcon />
                <span className="sr-only">New Direct Message</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>

                    <DialogTitle>New Direct Message</DialogTitle>
                    <DialogDescription>
                        Enter a username to send a friend request
                    </DialogDescription>
                </DialogHeader>
                <form className="contents" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        {/*htmlFor="username"*/}
                        <Label>Username</Label>
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