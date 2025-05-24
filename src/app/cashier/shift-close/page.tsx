"use client"

import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react";

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
    return <Box>
        <p>Se asume que este usuario revisó los montos y acepta el estado final.</p>
        <div className="flex items-center gap-3">
            <div className="flex gap-3 items-center justify-center">
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
            </div>
            <div className="flex items-center justify-center gap-1">
                <div className="flex gap-1">
                    <p>Inicio:</p> <span className="font-semibold text-md">10:00 am</span>
                </div>
                <div className="flex gap-1">
                    <p>Fin:</p> <span className="font-semibold text-md">8:00 pm</span>
                </div>
            </div>
        </div>
    </Box>
}
