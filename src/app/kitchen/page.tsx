"use client"
import Box from '@/components/ui/box'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export interface Dishes2Interface {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes: string;
}

export const fakeDishes: Dishes2Interface[] = [
  {
    id: 1,
    name: "Hamburguesa Clásica",
    price: 18000,
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg",
    quantity: 2,
    notes: "Sin cebolla y con extra queso",
  },
  {
    id: 2,
    name: "Pizza Margarita",
    price: 22000,
    image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
    quantity: 1,
    notes: "Agregar orégano adicional",
  },
  {
    id: 3,
    name: "Ensalada César",
    price: 15000,
    image: "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
    quantity: 3,
    notes: "Sin crutones, aderezo aparte",
  },
  {
    id: 4,
    name: "Tacos al Pastor",
    price: 20000,
    image: "https://comedera.com/wp-content/uploads/sites/9/2017/08/tacos-al-pastor-receta.jpg",
    quantity: 4,
    notes: "Agregar limón extra",
  },
];



export default function KitchenPage() {

  const [listOrdersFake, setListOrdersFake] = useState<Dishes2Interface[]>(fakeDishes);

  const onClickCompleted = (id: number) => {
    setListOrdersFake(prev => {
      return prev.filter(item => item.id !== id)
    })
  }

  return <div className="p-4">
    <span className="font-bold text-2xl">Pedidos en cocina</span>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {Array.from({ length: listOrdersFake.length }).map((_, index) => (
        <Box key={index} className="p-4 bg-white rounded-lg shadow-md space-y-4">
          <h1 className="text-xl font-bold text-black">
            Mesa {index + 1} - Número de orden : {index + 1}
          </h1>

          <div className="flex flex-col gap-4">
            {listOrdersFake.map((fakeDish) => (
              <div key={fakeDish.id} className="flex justify-between items-center">

                <div className="flex gap-3 items-start">
                  <img
                    className="object-cover w-14 h-14 rounded-md border"
                    src={fakeDish.image}
                    alt={`Imagen del plato ${fakeDish.name}`}
                  />

                  <div>
                    <h2 className="text-base font-medium text-black">
                      {fakeDish.name}
                    </h2>
                    <p className="text-sm italic text-gray-600">
                      {fakeDish.notes}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-sm font-medium text-black">
                    Cantidad
                  </h3>
                  <p className="text-lg font-bold text-black">
                    {fakeDish.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end" onClick={() => onClickCompleted(index + 1)}>
            <Button variant={index + 1 === 1 ? "default" : "secondary"} className="font-medium">
              Completado
            </Button>
          </div>
        </Box>
      ))}
    </div>
  </div>
}
