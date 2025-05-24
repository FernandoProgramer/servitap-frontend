import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Banknote, CreditCard, Send } from "lucide-react"
import { Button } from "../ui/button"
import CardForm from "./payment-forms/card-form"
import TransferForm from "./payment-forms/transfer-form"
import CashForm from "./payment-forms/cash-form"
import Simpletable from "../simpletable"
import { columns } from "@/app/cashier/charge-table/columnsSummaryOrder"
import { DataSummaryOrderInterface } from "@/app/cashier/charge-table/dataSummaryOrder"

interface DialogChargeTableProps {
    isOpen: number | null
    setIsOpen: (n: number | null) => void
    id: number
    onClickRegisterPayment: () => void
    bancosColombianos: Record<string, string>[]
    onSelectPayment: (data: "cash" | "credit-card" | "transfer" | null) => void
    methodPayment: "cash" | "credit-card" | "transfer" | null
    dataSummaryOrder: DataSummaryOrderInterface[]
}
export default function DialogChargeTable({ dataSummaryOrder, isOpen, setIsOpen, id, onClickRegisterPayment, bancosColombianos, onSelectPayment, methodPayment }: DialogChargeTableProps) {

    return <Dialog
        open={isOpen === id}
        onOpenChange={(open) => {
            if (!open) setIsOpen(null);
        }}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Cobrar mesa {id}</DialogTitle>

                <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
                    {/* tabla */}
                    <Simpletable data={dataSummaryOrder} columns={columns} />
                    {/* Formulario */}
                    <div className="flex flex-col gap-2">
                        <Label>Metodo de pago</Label>
                        <ToggleGroup size="lg" type="single" className="justify-between w-full">
                            <ToggleGroupItem
                                value="cash"
                                className="flex flex-col items-center justify-center py-10 w-full data-[state=on]:border-black first:rounded-l-md"
                                variant="outline"
                                onClick={() => onSelectPayment("cash")}
                            >
                                <Banknote />
                                <p>Efectivo</p>
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="credit-card"
                                className="flex flex-col items-center justify-center py-10 w-full data-[state=on]:border-black data-[state=on]:border-l-2"
                                variant="outline"
                                onClick={() => onSelectPayment("credit-card")}
                            >
                                <CreditCard />
                                <p>Tarjeta</p>
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="transfer"
                                className="flex flex-col items-center justify-center py-10 w-full border data-[state=on]:border-black last:rounded-r-md"
                                variant="outline"
                                onClick={() => onSelectPayment("transfer")}
                            >
                                <Send />
                                <p>Transferencia</p>
                            </ToggleGroupItem>
                        </ToggleGroup>

                        {/* Para pagos en efectivo */}
                        {methodPayment === "cash" && <CashForm />}

                        {/* Para pagos con tarjeta */}
                        {methodPayment === "credit-card" && <CardForm />}

                        {/* Para pagos por transferencia */}
                        {methodPayment === "transfer" && <TransferForm bancosColombianos={bancosColombianos} />}

                        <div className="flex gap-3 justify-center">
                            <Button variant="destructive" onClick={() => setIsOpen(null)}>Cancelar</Button>
                            <Button onClick={() => onClickRegisterPayment()}>Registrar pago</Button>
                        </div>

                    </div>
                </div>

            </DialogHeader>
        </DialogContent>
    </Dialog>

}
