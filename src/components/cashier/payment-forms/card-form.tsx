import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CardForm() {
    return <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-2">
            <div className="flex flex-col gap-1 w-full">
                <Label>Número de tarjeta*</Label>
                <Input placeholder="1234 5678 9101" />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <Label>CVV*</Label>
                <Input placeholder="123" />
            </div>
        </div>
        <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-1 w-full">
                <Label>Año de expiración*</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={new Date().getFullYear()} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Array.from({ length: 11 }, (_, i) => (new Date().getFullYear()) + i).map(year => <SelectItem key={year} value={`${year}`}>
                                {year}
                            </SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <Label>Mes de expiración*</Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={new Date().getMonth() + 1} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Array.from({ length: 12 }).map((_, index) => <SelectItem key={index + 1} value={`${index + 1}`}>
                                {index + 1}
                            </SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
}
