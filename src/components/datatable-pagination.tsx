"use client"

import { Table } from "@tanstack/react-table"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export default function DataTablePagination<TData>({
    table
}: DataTablePaginationProps<TData>) {

    const pageSizes = Array.from(
        new Set([5, 10, 15, table.getFilteredRowModel().rows.length])
    )

    return <div className="flex items-center justify-center gap-2">
        <div className="flex-1" />
        <div className="flex gap-10 items-center justify-center">
            <div className="flex gap-2 items-center justify-center">
                <p className="text-sm text-muted-foreground italic">Filas por página</p>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) =>
                        table.setPageSize(Number(value))
                    }
                >
                    <SelectTrigger>
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Número de filas</SelectLabel>
                            {pageSizes.map(pageSize => <SelectItem value={`${pageSize}`} key={pageSize}>
                                {pageSize}
                            </SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-2 items-center justify-center text-muted-foreground italic text-sm">
                Página {table.getState().pagination.pageIndex + 1} de {" "}{table.getPageCount()}
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeft />
                </Button>
                {Array.from({ length: table.getPageCount() }).map((_, pageIndex) =>
                    <Button
                        key={pageIndex}
                        variant="outline"
                        onClick={() => table.setPageIndex(pageIndex)}
                        disabled={table.getState().pagination.pageIndex === pageIndex}
                    >
                        {pageIndex + 1}
                    </Button>
                )}
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Siguiente</span>
                    <ChevronRight />
                </Button>
            </div>
        </div>
    </div>
}
