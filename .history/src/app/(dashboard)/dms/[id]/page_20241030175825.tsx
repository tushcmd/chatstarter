import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SendIcon, TrashIcon } from "lucide-react";



function MessageActions() {
    <DropdownMenu>
        <DropdownMenuContent>
            <DropdownMenuItem>
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