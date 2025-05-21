import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TransferForm({ bancosColombianos }: { bancosColombianos: Record<string, string>[] }) {
    return <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 w-full">
            <Label>Entidad bancaria*</Label>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un banco" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {bancosColombianos.map(banco => <SelectItem key={banco.value} value={banco.value}>
                            {banco.label}
                        </SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
        <div className="flex flex-col gap-1 w-full">
            <Label>Número de transferencia*</Label>
            <Input placeholder="3525135235" />
        </div>
        <div className="flex flex-col gap-1 w-full">
            <Label>Valor tranferido*</Label>
            <Input placeholder="$60.000,00" />
        </div>
    </div>
}
