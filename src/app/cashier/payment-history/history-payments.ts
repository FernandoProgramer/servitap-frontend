export interface HistoryPaymentsInterface {
    id: string;
    orderId?: string;
    customerName?: string;
    tableNumber?: number;
    status: 'Pagado' | 'Pendiente' | 'Cancelado';
    method: 'Efectivo' | 'Tarjeta Crédito' | 'Transferencia';
    amount: number;
    date: string;
}

export async function getPaymentHistory(): Promise<HistoryPaymentsInterface[]> {
    return [
        {
            id: "PAY001",
            orderId: "ORD101",
            customerName: "Carlos Pérez",
            tableNumber: 3,
            status: "Pagado",
            method: "Efectivo",
            amount: 56000,
            date: "2025-05-20T13:45:00Z",
        },
        {
            id: "PAY002",
            orderId: "ORD102",
            customerName: "Laura Gómez",
            tableNumber: 5,
            status: "Pendiente",
            method: "Tarjeta Crédito",
            amount: 89000,
            date: "2025-05-21T18:20:00Z",
        },
        {
            id: "PAY003",
            orderId: "ORD103",
            customerName: "Miguel Torres",
            tableNumber: 2,
            status: "Cancelado",
            method: "Transferencia",
            amount: 43000,
            date: "2025-05-21T12:15:00Z",
        },
        {
            id: "PAY004",
            orderId: "ORD104",
            customerName: "Ana Rodríguez",
            tableNumber: 1,
            status: "Pagado",
            method: "Tarjeta Crédito",
            amount: 77000,
            date: "2025-05-22T14:10:00Z",
        },
        {
            id: "PAY005",
            orderId: "ORD105",
            customerName: "Luis Martínez",
            tableNumber: 4,
            status: "Pagado",
            method: "Transferencia",
            amount: 91000,
            date: "2025-05-22T15:30:00Z",
        },
        {
            id: "PAY006",
            orderId: "ORD106",
            customerName: "Sofía Ramírez",
            tableNumber: 6,
            status: "Pagado",
            method: "Efectivo",
            amount: 64000,
            date: "2025-05-22T17:45:00Z",
        },
        {
            id: "PAY007",
            orderId: "ORD107",
            customerName: "Andrés Ruiz",
            tableNumber: 2,
            status: "Pendiente",
            method: "Tarjeta Crédito",
            amount: 82000,
            date: "2025-05-23T11:30:00Z",
        },
        {
            id: "PAY008",
            orderId: "ORD108",
            customerName: "Valentina Gómez",
            tableNumber: 7,
            status: "Pagado",
            method: "Transferencia",
            amount: 99000,
            date: "2025-05-23T13:15:00Z",
        },
        {
            id: "PAY009",
            orderId: "ORD109",
            customerName: "Ricardo Díaz",
            tableNumber: 3,
            status: "Pagado",
            method: "Efectivo",
            amount: 71000,
            date: "2025-05-23T14:40:00Z",
        },
        {
            id: "PAY010",
            orderId: "ORD110",
            customerName: "Daniela Castro",
            tableNumber: 1,
            status: "Cancelado",
            method: "Tarjeta Crédito",
            amount: 50000,
            date: "2025-05-23T16:00:00Z",
        },
        {
            id: "PAY010",
            orderId: "ORD110",
            customerName: "Daniela Castro",
            tableNumber: 1,
            status: "Cancelado",
            method: "Tarjeta Crédito",
            amount: 50000,
            date: "2025-05-23T16:00:00Z",
        },
    ];
}
