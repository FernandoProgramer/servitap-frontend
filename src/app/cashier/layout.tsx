import AppSidebarCashier from "@/components/cashier/appSidebarCashier";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function CashierLayout({ children }: { children: ReactNode }) {
    return <SidebarProvider>
        <AppSidebarCashier />
        <main className="w-full h-screen overflow-y-auto">
            {children}
        </main>
    </SidebarProvider>
}
