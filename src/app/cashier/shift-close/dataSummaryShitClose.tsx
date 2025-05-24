export interface ShiftClosePaymentSummary {
    methodPayment: "Efectivo" | "Tarjeta" | "Transferencia"
    total: number
}

export async function getSummaryShiftClose(): Promise<ShiftClosePaymentSummary[]> {
    return [
        { methodPayment: "Efectivo", total: 450000 },
        { methodPayment: "Tarjeta", total: 320000 },
        { methodPayment: "Transferencia", total: 150000 }
    ]
};
