"use client"

import { ColumnDef } from '@tanstack/react-table'
import { HistoryPaymentsInterface } from './history-payments'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DataTableColumnHeader from '@/components/datatable-column-header';


export const columns: ColumnDef<HistoryPaymentsInterface>[] = [
    { accessorKey: "id", header: "ID", enableHiding: false },
    { accessorKey: "orderId", header: "ID Orden", enableHiding: false },
    {
        accessorKey: "customerName", header: ({ column }) => (
            <DataTableColumnHeader title="Cliente" column={column} />
        )
    },
    { accessorKey: "tableNumber", header: "Mesa" },
    { accessorKey: "status", header: "Estado" },
    { accessorKey: "method", header: "Método de Pago", enableHiding: false },
    { accessorKey: "amount", header: "Monto (COP)", enableHiding: false },
    { accessorKey: "date", header: "Fecha" },
    {
        id: "actions",
        cell: ({ row }) => <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                <DropdownMenuItem>Reenviar recibo</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>Marcar como reembolsado</DropdownMenuItem>
                <DropdownMenuItem>Eliminar registro</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>,
        enableHiding: false
    }
];