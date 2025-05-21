"use client"
import DialogChargeTable from "@/components/cashier/dialogChargeTable";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

export default function page() {

    const [isOpen, setIsOpen] = useState<null | number>(null);
    const [methodPayment, setMethodPayment] = useState<"cash" | "credit-card" | "transfer" | null>(null);
    const bancosColombianos = [
        { value: "bancolombia", label: "Bancolombia" },
        { value: "davivienda", label: "Davivienda" },
        { value: "bbva-colombia", label: "BBVA Colombia" },
        { value: "banco-de-bogota", label: "Banco de Bogotá" },
        { value: "banco-agrario", label: "Banco Agrario" },
        { value: "banco-popular", label: "Banco Popular" },
        { value: "banco-de-occidente", label: "Banco de Occidente" },
        { value: "scotiabank-colpatria", label: "Scotiabank Colpatria" },
        { value: "banco-itau", label: "Banco Itaú" },
        { value: "banco-pichincha", label: "Banco Pichincha" },
        { value: "bancoomeva", label: "Bancoomeva" },
        { value: "nequi", label: "Nequi" },
        { value: "daviplata", label: "Daviplata" },
        { value: "movii", label: "Movii" },
        { value: "giros-y-finanzas", label: "Giros y Finanzas" },
        { value: "banco-serfinanza", label: "Banco Serfinanza" },
        { value: "banco-finandina", label: "Banco Finandina" },
        { value: "compensar", label: "Compensar" },
        { value: "otro", label: "Otro" }
    ];


    const onClickCharge = (index: number) => {
        setIsOpen(index);
    }

    const onClickRegisterPayment = () => {
        toast.success("Pago registrado correctamente");
        setIsOpen(null);
    }

    const onSelectPayment = (method: "cash" | "credit-card" | "transfer" | null) => {
        setMethodPayment(method);
    }

    return <>
        <div className="max-w-md">
            <Input placeholder="Buscar mesa" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => <Box
                key={`Mesa #${index + 1}`}
                className="h-[10rem] hover:shadow-2xl hover:shadow-indigo-500/20 items-center justify-center gap-3"
            >
                <h1 className="font-bold text-lg text-center">Mesa {index + 1}</h1>
                <div className="flex flex-col text-sm font-medium">
                    <p className="italic text-muted-foreground">Cantidad de platos: <span className="font-semibold not-italic text-foreground">{index + 1}</span></p>
                    <p className="italic text-muted-foreground">Total a pagar: <span className="font-semibold not-italic text-foreground">${(index + 1) * 10000}</span></p>
                </div>

                <div className="justify-center">
                    <Button onClick={() => onClickCharge(index + 1)}>
                        Cobrar
                    </Button>
                </div>
                <DialogChargeTable
                    methodPayment={methodPayment}
                    onSelectPayment={onSelectPayment}
                    bancosColombianos={bancosColombianos}
                    onClickRegisterPayment={onClickRegisterPayment}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    id={index}
                />
            </Box>)}
        </div>
    </>

}
