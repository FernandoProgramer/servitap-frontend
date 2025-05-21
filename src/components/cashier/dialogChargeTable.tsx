import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { Banknote, CreditCard, RefreshCw, Send } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import CashForm from "./payment-forms/Cash-form"
import CardForm from "./payment-forms/card-form"
import TransferForm from "./payment-forms/transfer-form"

interface DialogChargeTableProps {
    isOpen: number | null
    setIsOpen: (n: number | null) => void
    id: number
    onClickRegisterPayment: () => void
    bancosColombianos: Record<string, string>[]
    onSelectPayment: (data: "cash" | "credit-card" | "transfer" | null) => void
    methodPayment: "cash" | "credit-card" | "transfer" | null
}
export default function DialogChargeTable({ isOpen, setIsOpen, id, onClickRegisterPayment, bancosColombianos, onSelectPayment, methodPayment }: DialogChargeTableProps) {
    return <Dialog
        open={isOpen === id}
        onOpenChange={(open) => {
            if (!open) setIsOpen(null);
        }}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Cobrar mesa {id}</DialogTitle>

                <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col gap-2 border border-border p-3 bg-background shadow-sm">
                        <div className="flex flex-col gap-2">
                            {/* Ítem 1 */}
                            <div className="flex justify-between items-center text-base">
                                <p className="font-semibold text-foreground">
                                    Hamburguesa <span className="text-sm font-normal text-muted-foreground">(x2)</span>
                                </p>
                                <p className="text-right text-foreground font-medium">$20.000,00</p>
                            </div>

                            {/* Ítem 2 con observación */}
                            <div className="flex justify-between items-center text-base">
                                <p className="font-semibold text-foreground">
                                    Hamburguesa <span className="italic text-sm font-normal text-muted-foreground">(Sin cebolla)</span> <span className="text-sm font-normal text-muted-foreground">(x1)</span>
                                </p>
                                <p className="text-right text-foreground font-medium">$10.000,00</p>
                            </div>

                            {/* Ítem 3 */}
                            <div className="flex justify-between items-center text-base">
                                <p className="font-semibold text-foreground">
                                    Hamburguesa <span className="text-sm font-normal text-muted-foreground">(x2)</span>
                                </p>
                                <p className="text-right text-foreground font-medium">$20.000,00</p>
                            </div>
                        </div>

                        <Separator className="my-2" />

                        {/* Total */}
                        <div className="flex justify-between items-center text-lg mt-2">
                            <p className="font-bold text-foreground">Total a pagar:</p>
                            <p className="font-bold text-foreground">$60.000,00</p>
                        </div>
                    </div>
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
