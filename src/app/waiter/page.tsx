"use client"
import Box from "@/components/ui/box";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Box key={table.id}>
          <Link
              href={`waiter/attend/${table.id}/`}
              type="button"
              className="w-full relative flex flex-col items-center justify-center pb-10 pt-5"
            >
              <span className="font-bold text-2xl">{table.name}</span>

              {table.isAttented && (
                <span className="absolute bg-yellow-100 left-1/2 -translate-x-1/2 bottom-2 text-yellow-800 py-1 px-3 rounded-full shadow-sm text-xs font-medium">
                  Atendida
                </span>
              )}
            </Link>
        </Box>
      ))}
    </div>
  </div>

}