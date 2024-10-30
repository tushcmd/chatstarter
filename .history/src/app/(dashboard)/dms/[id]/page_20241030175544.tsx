import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";







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