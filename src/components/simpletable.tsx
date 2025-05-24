"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"


interface SimpletableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    caption?: string
}
export default function Simpletable<TData, TValue>({
    data, columns, caption
}: SimpletableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return <Table>
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
            {table.getRowModel().rows.map(row => <TableRow key={row.id}>
                {row.getAllCells().map(cell => <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>)}
            </TableRow>)}
        </TableBody>
    </Table>
}
