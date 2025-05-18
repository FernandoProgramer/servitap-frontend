"use client"
import { cn } from "@/libs/utils";
import Link from "next/link";

export const tables = [
  { id: 1, name: "Mesa 1", isAttented: false },
  { id: 2, name: "Mesa 2", isAttented: true },
  { id: 3, name: "Mesa 3", isAttented: false },
  { id: 4, name: "Mesa 4", isAttented: true },
  { id: 5, name: "Mesa 5", isAttented: false },
  { id: 6, name: "Mesa 6", isAttented: false },
  { id: 7, name: "Mesa 7", isAttented: false },
  { id: 8, name: "Mesa 8", isAttented: true },
  { id: 9, name: "Mesa 9", isAttented: true },
  { id: 10, name: "Mesa 10", isAttented: true },
];


export default function WaiterPage() {
  return <div>
    <div className="grid grid-cols-2 gap-2 px-4">
      {tables.map((table) => (
        <Link href={`waiter/attend/${table.id}/`} type="button" key={table.id} className={cn(
          "shadow relative borde justify-center items-center flex px-10 pt-4 pb-14 rounded-xl transition-all ease-in-out duration-300 ", "border-gray-500 cursor-pointer hover:bg-gray-100 hover:shadow-lg bg-white text-gray-900"
        )}>
          <span className="font-bold text-2xl">{table.name}</span>
          {table.isAttented && <div>
            <span className="absolute bg-yellow-100 left-1/2 -translate-x-1/2 bottom-6 text-yellow-800 py-1 px-3 rounded-full shadow-sm text-xs font-medium">Atentidada</span>
          </div>}

        </Link>
      ))}
    </div>
  </div>
}