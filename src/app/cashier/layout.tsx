import AppSidebarCashier from "@/components/cashier/appSidebarCashier";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function CashierLayout({ children }: { children: ReactNode }) {
    return <SidebarProvider>
        <AppSidebarCashier />
        <main className="p-4">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>


}
