"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataSummaryOrderInterface } from "./dataSummaryOrder";

export const columns: ColumnDef<DataSummaryOrderInterface>[] = [
    { accessorKey: "dish", header: "Plato" },
    { accessorKey: "amount", header: "Cantidad" },
    { accessorKey: "priceU", header: "Precio U" },
];