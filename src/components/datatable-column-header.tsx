"use client"

import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { HTMLAttributes } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
    title: string
    column: Column<TData, TValue>
}

export default function DataTableColumnHeader<TData, TValue>({
    title, column, className
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) return <div className={cn(className)}>{title}</div>
    return <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <span>{title}</span>
                    {column.getIsSorted() === "desc" ? (
                        <ArrowDown />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowUp />
                    ) : <ArrowUpDown />}
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                    <ArrowUp />
                    Asc
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                    <ArrowDown />
                    Des
                </DropdownMenuItem>
                {column.getIsSorted() && <DropdownMenuItem onClick={() => column.clearSorting()}>
                    <ArrowUpDown />
                    Restablecer
                </DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
}