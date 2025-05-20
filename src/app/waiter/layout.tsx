"use client"
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { CircleChevronLeft } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import MenuWaiter from './attend/[idTable]/menuWaiter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function WaiterLayout({ children }: { children: ReactNode }) {
    const { idTable } = useParams();
    const path = usePathname();
    const nameSectionMap = {
        "/waiter": {
            name: "Mesas disponibles",
            description: "Selecciona una mesa para comenzar a tomar el pedido.",
        },
        [`/waiter/attend/${idTable}`]: {
            name: `Mesa ${idTable} – Tomar pedido`,
            description: "Registra los platos solicitados por los clientes. Asegúrate de confirmar cada pedido.",
        },
    };

    const section = nameSectionMap[path]

    return <section className="flex flex-col gap-4">

        <div className="p-4 flex items-center justify-between rounded-md">
            <div className="flex gap-2 items-center justify-center">
                <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZmlsJTIwZGUlMjBob21icmV8ZW58MHx8MHx8fDA%3D" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium text-md">
                        William Jerome
                    </span>
                    <span className="font-light">
                        Mesero
                    </span>
                </div>
                {/* <span className="font-bold text-lg">ServiTap</span> */}
            </div>
            <MenuWaiter />
        </div>

        {section && <div className="px-4">
            <Box className="border-0 shadow-none">
                <span className="text-2xl font-semibold">
                    {section.name}
                </span>
                <span className="text-md font-medium text-gray-600">
                    {section.description}
                </span>
            </Box>
        </div>}
        {children}
    </section>
}
