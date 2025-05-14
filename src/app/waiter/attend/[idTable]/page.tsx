"use client";

import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import TotalDishesSheet from './totalDishesSheet';
import DialogAddDish from './dialogAddDish';
import { Newspaper } from 'lucide-react';


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
const fakeDishes: DishesInterface[] = [
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


export default function AttendTableIdPage() {

    const [orderdDishes, setOrderdDishes] = useState<DishesToOrderInterface[]>([]);
    const [openModal, setOpenModal] = useState<number | null>(null);
    const [openSheet, setOpenSheet] = useState(false)
    const [observations, setObservations] = useState<string>("");


    const handleAddDish = (dish: DishesInterface) => {
        setOrderdDishes(prev => {
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
                idOrder: orderdDishes.length,
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
        setOrderdDishes(prev => {
            return prev
                .map(item =>
                    item.idOrder === id
                        ? { ...item, amount: direction === "minus" ? item.amount - 1 : item.amount + 1 }
                        : item
                )
                .filter(item => item.idOrder !== id || item.amount > 0);
        });
    };


    const onChangeObservation = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setObservations(e.target.value);
    }

    return (
        <div className="flex flex-col gap-4">

            {orderdDishes.length > 0 && <Button onClick={() => setOpenSheet(!openSheet)} size="icon" variant="ghost" className="absolute right-3 top-4 w-12 h-12 flex items-center justify-center">
                <Newspaper />
                <span className="absolute top-0.5 right-1 min-w-5 h-5 px-1.5 text-xs flex items-center justify-center rounded-full bg-rose-600 text-white font-bold">
                    {orderdDishes.reduce((acum, dish) => acum + dish.amount, 0)}
                </span>
            </Button>}

            <TotalDishesSheet
                onClearOrder={() => {
                    setOpenSheet(false)
                    setOrderdDishes([]);
                }}
                openSheet={openSheet}
                setOpenSheet={setOpenSheet}
                onChangeAmount={onChangeAmount}
                orderdDishes={orderdDishes}
            />

            <Input placeholder="Buscar plato" />
            <div className="grid grid-cols-1 gap-4">

                <div className="w-full flex gap-4">
                    {[
                        { label: "Comida rápida", link: "#" },
                        { label: "Platos fuertes", link: "#" },
                        { label: "Bebidas", link: "#" },
                        { label: "Postres", link: "#" },
                        { label: "Ensaladas / entradas", link: "#" }
                    ].map((category, index) => (
                        <Link key={index} href={category.link} className={cn(buttonVariants({ variant: "outline" }))}>
                            {category.label}
                        </Link>
                    ))}
                </div>

                {fakeDishes.map((dish) => (
                    <div key={dish.id}>
                        <div className="p-2 rounded-md border-gray-400 flex items-center gap-4">
                            < img
                                src={dish.image}
                                alt={`Imagen de ${dish.name}`}
                                className="object-cover w-20 h-20 rounded-md"
                            />

                            <div className="flex flex-col gap-2 w-full text-left">
                                <span className="text-lg font-bold">{dish.name}</span>
                                <span className="text-md font-medium">
                                    ${dish.price.toLocaleString()}
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
                        </div>
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
        </div >
    );
}
