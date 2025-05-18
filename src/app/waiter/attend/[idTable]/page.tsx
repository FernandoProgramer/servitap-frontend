"use client";
import { Button, buttonVariants } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { cn } from '@/libs/utils';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import TotalDishesSheet from './totalDishesSheet';
import DialogAddDish from './dialogAddDish';
import { icons, Newspaper, NotepadText, PenLine, X } from 'lucide-react';
import Box from '@/components/ui/box';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export interface DishesInterface {
    id: number
    name: string
    price: number
    image: string
}

export interface DishesToOrderInterface extends DishesInterface {
    idOrder: number
    amount: number
    totalToPay: number
    observations?: string
}
export const fakeDishes: DishesInterface[] = [
    {
        id: 1,
        name: "Hamburguesa Clásica",
        price: 18000,
        image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg",
    },
    {
        id: 2,
        name: "Pizza Margarita",
        price: 22000,
        image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
    },
    {
        id: 3,
        name: "Ensalada César",
        price: 15000,
        image: "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
    },
    {
        id: 4,
        name: "Tacos al Pastor",
        price: 20000,
        image: "https://comedera.com/wp-content/uploads/sites/9/2017/08/tacos-al-pastor-receta.jpg",
    },
];

const tableStatuses = [
    { label: "Sin atender", value: "sin_atender", colors: "bg-red-100 text-red-800" },
    { label: "Atendida", value: "atendida", colors: "bg-green-100 text-green-800" },
    { label: "Para limpieza", value: "para_limpieza", colors: "bg-yellow-100 text-yellow-800" },
];


export default function AttendTableIdPage() {

    const [orderedDishes, setOrderedDishes] = useState<DishesToOrderInterface[]>([]);
    const [openModal, setOpenModal] = useState<number | null>(null);
    const [openSheet, setOpenSheet] = useState(false)
    const [observations, setObservations] = useState<string>("");
    const [statusTable, setStatusTable] = useState<string>("sin_atender");
    const router = useRouter();
    const handleAddDish = (dish: DishesInterface) => {
        setOrderedDishes(prev => {
            const existing = prev.find(item => item.id === dish.id && (item.observations || "") === observations.trim());

            if (existing) return prev.map(item =>
                item.id === dish.id && (item.observations || "") === observations.trim()
                    ? {
                        ...item,
                        amount: item.amount + 1,
                        totalToPay: (item.amount + 1) * item.price,
                    }
                    : item
            )


            const newDish: DishesToOrderInterface = {
                ...dish,
                idOrder: orderedDishes.length,
                amount: 1,
                totalToPay: dish.price,
                observations: observations.trim() || undefined
            }

            return [...prev, newDish];
        })

        setOpenModal(null);
        setObservations("");
    }
    const onChangeAmount = (direction: "minus" | "plus", id: number) => {
        setOrderedDishes(prev => {
            return prev
                .map(item =>
                    item.idOrder === id
                        ? {
                            ...item,
                            amount: direction === "minus" ? item.amount - 1 : item.amount + 1,
                            totalToPay: (direction === "minus" ? item.amount - 1 : item.amount + 1) * item.price
                        }
                        : item
                )
                .filter(item => item.idOrder !== id || item.amount > 0);
        });
    };


    const onChangeObservation = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setObservations(e.target.value);
    }


    const onSubmitOrder = () => {
        toast.success("Orden solicitada");
        setOpenSheet(false);
        setStatusTable("atendida");
        setTimeout(() => {
            router.push("/waiter/");
        }, 1000);
    }

    return <div className="flex flex-col gap-4 px-4">
        <Box>
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-800">Estado:</p>
                <div className="flex gap-2 items-center justify-center">
                    <span
                        className={`rounded-full px-4 py-1 text-sm font-medium ${tableStatuses.find((s) => s.value === statusTable)?.colors || "bg-gray-100 text-gray-800"
                            }`}
                    >
                        {tableStatuses.find((s) => s.value === statusTable)?.label || "Desconocido"}
                    </span>

                    <Popover>
                        <PopoverTrigger className={cn(buttonVariants({ variant: "outline" }), "flex gap-2 items-center justify-center")}>
                            <PenLine size={20} /> <span>Cambiar estado</span>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Select value={statusTable} onValueChange={setStatusTable}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tableStatuses.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <Input placeholder="Buscar plato" className="max-w-sm w-full" />
        </Box>

        <div className="w-full flex gap-4">
            {[
                { label: "Comida rápida", link: "#" },
                { label: "Platos fuertes", link: "#" },
                { label: "Bebidas", link: "#" },
                { label: "Postres", link: "#" },
                { label: "Ensaladas / entradas", link: "#" }
            ].map((category, index) => (
                <Link key={index} href={category.link} className={cn(buttonVariants({ variant: category.label === "Comida rápida" ? "default" : "outline" }))}>
                    {category.label}
                </Link>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
            {fakeDishes.map((dish) => (
                <div key={dish.id}>
                    <Box className="flex-row">
                        <img
                            src={dish.image}
                            alt={`Imagen de ${dish.name}`}
                            className="object-cover w-20 h-20 rounded-md"
                        />

                        <div className="flex flex-col gap-2 w-full text-left">
                            <span className="text-lg font-bold">{dish.name}</span>
                            <span className="text-md font-medium">
                                ${dish.price.toLocaleString("es-CO")}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-center">
                            <Button type="button" onClick={() => setOpenModal(dish.id)}>
                                Agregar
                            </Button>
                            <Link href="#" className={cn(buttonVariants({ variant: "link" }))}>
                                Ver más
                            </Link>
                        </div>
                    </Box>

                    <DialogAddDish
                        onChangeObservation={onChangeObservation}
                        openModal={openModal}
                        dish={dish}
                        setOpenModal={setOpenModal}
                        handleAddDish={handleAddDish}
                    />
                </div>
            ))}
        </div>

        <TotalDishesSheet
            onSubmitOrder={onSubmitOrder}
            onClearOrder={() => {
                setOpenSheet(false)
                setOrderedDishes([]);
            }}
            openSheet={openSheet}
            setOpenSheet={setOpenSheet}
            onChangeAmount={onChangeAmount}
            orderedDishes={orderedDishes}
        />

        {orderedDishes.length > 0 && <div className="w-full sticky bottom-2 items-center flex justify-center">
            <Button size="lg" onClick={() => setOpenSheet(!openSheet)} className="w-full flex items-center justify-center font-bold gap-2 p-4 border max-w-md">
                <NotepadText size={25} /> <span>Ver pedidos ({orderedDishes.reduce((acum, dish) => acum + dish.amount, 0)})</span>
            </Button>
        </div>}
    </div>
}
