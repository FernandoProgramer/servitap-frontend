import { ColumnDef } from "@tanstack/react-table";
import { ShiftClosePaymentSummary } from "./dataSummaryShitClose";

export const columns: ColumnDef<ShiftClosePaymentSummary>[] = [
    { accessorKey: "methodPayment", header: "Metodo de pago" },
    { accessorKey: "total", header: "total" },
]