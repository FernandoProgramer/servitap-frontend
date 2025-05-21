import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Box({ children, className }: { children: ReactNode, className?: string }) {
    return <div className={cn("flex flex-col gap-2 border shadow-md p-2 rounded-md transition ease-in-out duration-300", className)}>
        {children}
    </div>
}
