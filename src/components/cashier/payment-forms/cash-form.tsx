import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CashForm() {
    return <div>
        <div className="flex flex-col gap-1">
            <Label>Total a pagar</Label>
            <Input readOnly value="$60.000,00" />
        </div>
        <div className="flex flex-col gap-1">
            <Label>Valor ingresado*</Label>
            <Input placeholder="$100.000,00" />
        </div>
        <div className="flex gap-1">
            <p className="text-muted-foreground">Cambio a entregar:</p> <span className="font-semibold text-md ">${(100000 - 60000).toLocaleString("es-CO")}</span>
        </div>
    </div>
}
