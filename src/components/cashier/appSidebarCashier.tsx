import React, { ReactNode } from 'react'

import {
    DollarSign,
    Clock,
    Lock,
    PiggyBank,
    ChevronsUpDown,
    SquarePen,
    DoorOpen,
} from "lucide-react";
import Link from 'next/link';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

interface Actions {
    title: string
    icon: ReactNode
    url: string
    important?: boolean
}
interface GroupedCashierActions {
    title: string
    actions: Actions[]
}
const groupedCashierActions: GroupedCashierActions[] = [
    {
        title: "Operaciones de Caja",
        actions: [
            {
                title: "Cobrar mesa",
                icon: <DollarSign className="size-5" />,
                url: "/cashier/charge-table",
            },
            {
                title: "Historial de pagos",
                icon: <Clock className="size-5" />,
                url: "/cashier/payment-history",
            },
        ],
    },
    {
        title: "Cierre y Reportes",
        actions: [
            {
                title: "Cierre de turno",
                icon: <Lock className="size-5" />,
                url: "/cashier/shift-close",
                important: true
            },
            {
                title: "Resumen diario",
                icon: <PiggyBank className="size-5" />,
                url: "/cashier/daily-summary",
            },
        ],
    },
];

export default function AppSidebarCashier() {
    return <Sidebar>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Avatar>
                            <AvatarImage src="/logo-servi-tap-sm.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-bold text-md">ServiTap</span>
                            <span className="truncate text-xs">Caja</span>
                        </div>

                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            {groupedCashierActions.map((item, index) => <SidebarGroup key={index}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {item.actions.map((item, index) => <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url} className={cn(item.important && buttonVariants({ variant: "default" }), "justify-start")}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>)}
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="truncate font-semibold">Camilo Riveros</span>
                                    <span className="truncate text-xs">Caja</span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <div className="flex justify-between items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="truncate font-semibold">Camilo Riveros</span>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <SquarePen />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                                <DoorOpen />
                                Cerrar Sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
}
