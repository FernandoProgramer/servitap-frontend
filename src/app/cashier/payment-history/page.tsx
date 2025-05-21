import { Button } from '@/components/ui/button'
import { InputSearch } from '@/components/ui/input'
import { EllipsisVertical, FileDown } from 'lucide-react'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

export default function PaymentHistoryPage() {

    const paymentHistory = [
        {
            id: "FAC001",
            status: "Pagado",
            method: "Tarjeta Crédito",
            amount: 250000,
        },
        {
            id: "FAC002",
            status: "Pendiente",
            method: "Efectivo",
            amount: 180000,
        },
        {
            id: "FAC003",
            status: "Cancelado",
            method: "Transferencia",
            amount: 95500,
        },
        {
            id: "FAC004",
            status: "Pagado",
            method: "Efectivo",
            amount: 320000,
        },
    ];

    return <>
        <div className="flex justify-between gap-2">
            <InputSearch className="sm:max-w-[3rem] md:max-w-sm" />
            <Button variant="outline">
                <FileDown />
                Exportar
            </Button>
        </div>
        <div className="w-full">
            <Table>
                <TableCaption>Lista de pagos recientes del restaurante</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Factura</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Método de Pago</TableHead>
                        <TableHead>Monto (COP)</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paymentHistory.map((pago) => (
                        <TableRow key={pago.id}>
                            <TableCell>{pago.id}</TableCell>
                            <TableCell>{pago.status}</TableCell>
                            <TableCell>{pago.method}</TableCell>
                            <TableCell>
                                {pago.amount.toLocaleString("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                })}
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <EllipsisVertical />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="flex flex-col space-y-1">
                                            <h1 className="font-bold">Acciones</h1>
                                            <Button variant="ghost">Ver detalles</Button>
                                            <Separator />
                                            <Button variant="ghost">Reimprimir recibo</Button>
                                            <Button variant="ghost">Enviar recibo por correo</Button>
                                            {pago.status !== "Cancelado" && (
                                                <Button variant="ghost" className="text-red-600">
                                                    Anular pago
                                                </Button>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    </>
}
