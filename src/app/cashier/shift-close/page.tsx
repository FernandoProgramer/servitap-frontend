"use client"

import Simpletable from "@/components/simpletable";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { getSummaryShiftClose, ShiftClosePaymentSummary } from "./dataSummaryShitClose";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";

interface Cashier {
    id: number;
    name: string;
    numDocument: number;
}
const fakeCashiers: Cashier[] = [
    { id: 0, name: "Laura Mendoza", numDocument: 1023456789 },
    { id: 1, name: "Carlos Ruiz", numDocument: 1045896321 },
    { id: 2, name: "Valentina Gómez", numDocument: 1011121314 },
    { id: 3, name: "Andrés Torres", numDocument: 1098765432 },
    { id: 4, name: "Sofía Pardo", numDocument: 1001001001 },
];

export default function ShiftClosePage() {
    const [value, setValue] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<ShiftClosePaymentSummary[]>([]);
    const [timeStart, setTimeStart] = useState('08:00');
    const [timeEnd, setTimeEnd] = useState('20:00');

    const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>, direction: "start" | "end") => {
        if (direction === "start") return setTimeStart(e.target.value);
        if (direction === "end") return setTimeEnd(e.target.value);
    }

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getSummaryShiftClose();
                setData(data);
            } catch { }
        }
        loadData()
    }, [])

    return <Box>
        <p>Se asume que este usuario revisó los montos y acepta el estado final.</p>
        <div className="flex items-center gap-3">
            <p>Mesero:</p>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        {value || "Selecciona un cajero"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                    <Command>
                        <CommandInput placeholder="Buscar..." />
                        <CommandList>
                            <CommandEmpty>No se encontraron resultados</CommandEmpty>
                            <CommandGroup>
                                {fakeCashiers.map(cashier => (
                                    <CommandItem
                                        key={cashier.id}
                                        value={`${cashier.name} - ${cashier.numDocument}`}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {`${cashier.name} - ${cashier.numDocument}`}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <p>Inicio:</p> <Input type="time" className="max-w-xs" value={timeStart} onChange={(e) => onChangeTime(e, "start")} />
            <p>Fin:</p>  <Input type="time" className="max-w-xs" value={timeEnd} onChange={(e) => onChangeTime(e, "end")} />
        </div>
        <div className="border rounded-md">
            <Simpletable data={data} columns={columns} TFooter={
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            Total
                        </TableCell>
                        <TableCell>
                            100.000,00
                        </TableCell>
                    </TableRow>
                </TableFooter>
            } />
            <Separator />
        </div>

        <div className="flex flex-col gap-1">
            <Label>
                Comentarios del cajero
            </Label>
            <Textarea />
        </div>
        <div className="flex items-center justify-center gap-2">
            <Button variant="destructive">
                Cancelar
            </Button>
            <Button>
                Confirmar y cerrar turno
            </Button>
        </div>
    </Box>
}
