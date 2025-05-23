"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, PaginationState, getPaginationRowModel, SortingState, getSortedRowModel, VisibilityState, getFilteredRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Box from './ui/box'
import React, { useState } from 'react'
import DataTablePagination from './datatable-pagination'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { InputSearch } from './ui/input'

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
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            pagination,
            sorting,
            columnVisibility,
            globalFilter,
        },
    });

    return <Box>
        <div className="flex items-center justify-between">
            <InputSearch onChange={(e) => setGlobalFilter(e.target.value)} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
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
