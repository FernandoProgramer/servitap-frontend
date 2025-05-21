import { ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";

interface TitleSectionProps {
    title: string
    children: ReactNode
    headerClassName?: string
    contentClassName?: string
}
export default function TitleSection({ title, children, headerClassName, contentClassName }: TitleSectionProps) {
    return <div>
        <div className={cn("sticky top-0 z-10", headerClassName)}>
            <div className="w-full h-15 bg-white/30 backdrop-blur-sm absolute z-20" />
            <div className="flex flex-col relative z-30">
                <SidebarTrigger />
                <span className="font-semibold text-xl px-2">
                    {title}
                </span>
            </div>
        </div>
        <div className={cn("p-2 relative z-0 flex flex-col gap-3", contentClassName)}>
            {children}
        </div>
    </div>
}
