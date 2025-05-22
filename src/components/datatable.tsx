"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, PaginationState, getPaginationRowModel, SortingState, getSortedRowModel, VisibilityState } from '@tanstack/react-table'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Box from './ui/box'
import { useState } from 'react'
import DataTablePagination from './datatable-pagination'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

interface DataTableHistoryPaymentProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    caption?: string
}

export default function DataTable<TData, TValue>({
    data, columns, caption
}: DataTableHistoryPaymentProps<TData, TValue>) {

    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 5,
        pageIndex: 0,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            pagination,
            sorting,
            columnVisibility
        },
    })

    return <Box>
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="ml-auto" variant="outline">
                        Filas
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter(column => column.getCanHide())
                        .map(column => <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>)}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                {table.getHeaderGroups().map(headerGroup => <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                    </TableHead>)}
                </TableRow>)}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map(row =>
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell =>
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            )}
                        </TableRow>
                    )
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-2">
                            No hay resultados
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        <DataTablePagination table={table} />
    </Box>
}
