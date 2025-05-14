import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { DishesToOrderInterface } from "./page";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";


interface TotalDishesSheetProps {
  orderdDishes: DishesToOrderInterface[]
  onClearOrder: () => void
  onChangeAmount: (direcion: "minus" | "plus", id: number) => void
  openSheet: boolean
  setOpenSheet: (state: boolean) => void
}
export default function TotalDishesSheet({ onClearOrder, openSheet, setOpenSheet, orderdDishes, onChangeAmount }: TotalDishesSheetProps) {

  return <Sheet open={openSheet} onOpenChange={setOpenSheet}>
    <SheetContent>
      <SheetHeader className="mt-5">
        <SheetTitle className="text-xl">Resumen de la orden</SheetTitle>
        <SheetDescription>
          {orderdDishes.length === 0 ? "No hay platos a confirmar." : "Recuerde confirmar dicha información."}
        </SheetDescription>
      </SheetHeader>
      <div className="grid grid-cols-1 gap-4 overflow-y-auto px-4">
        {orderdDishes.map((dish) =>
          dish.amount >= 1 && (
            <div
              key={dish.idOrder}
              className="border p-4 rounded-lg flex flex-col items-center text-center"
            >
              <img
                src={dish.image}
                alt={`Imagen del plato ${dish.name}`}
                className="object-cover w-28 h-28 rounded-md"
              />
              <div className="mt-3 flex flex-col gap-1">
                <p className="text-base sm:text-lg font-semibold text-gray-900">{dish.name}</p>
                {dish.observations && <p className="text-sm text-gray-700 italic">{dish.observations}</p>}
                <p className="text-sm font-medium text-gray-600">${dish.price}</p>

                <div className="flex gap-2 items-center justify-center mt-3">
                  <Button onClick={() => onChangeAmount("minus", dish.idOrder)} variant="outline">
                    <Minus />
                  </Button>
                  <span>{dish.amount}</span>
                  <Button onClick={() => onChangeAmount("plus", dish.idOrder)} variant="outline">
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
          )
        )}

        <div className="flex items-center justify-center gap-4">
          <Button variant="destructive" onClick={() => onClearOrder()}>
            Vaciar
          </Button>
          <Button disabled={orderdDishes.length === 0} onClick={() => toast.success("Orden solicitada")}>
            Ordenar
          </Button>
        </div>

      </div>

    </SheetContent>
  </Sheet>
}
