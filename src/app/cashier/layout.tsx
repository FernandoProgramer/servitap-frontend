import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import AppSidebarCashier from "@/components/appSidebarCashier";

export default function CashierLayout({ children }: { children: ReactNode }) {
    return <SidebarProvider>
        <AppSidebarCashier />
        <SidebarInset>
            <SidebarTrigger />
            {children}
        </SidebarInset>
    </SidebarProvider>


}
