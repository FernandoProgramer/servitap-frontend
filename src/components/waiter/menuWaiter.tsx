import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Grid2x2, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MenuWaiter() {

    const router = useRouter();
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 items-center justify-center">
                <Menu /><span>Abrir menú</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/waiter/")}>
                <Grid2x2 />
                Ver mesas
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

}
