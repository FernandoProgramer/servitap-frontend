import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Box from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";
import { DishesToOrderInterface } from "@/app/waiter/attend/[idTable]/page";

interface TotalDishesSheetProps {
  orderedDishes: DishesToOrderInterface[]
  onClearOrder: () => void
  onChangeAmount: (direcion: "minus" | "plus", id: number) => void
  openSheet: boolean
  setOpenSheet: (state: boolean) => void
  onSubmitOrder: () => void
}
export default function TotalDishesSheet({ onClearOrder, openSheet, setOpenSheet, orderedDishes, onChangeAmount, onSubmitOrder }: TotalDishesSheetProps) {

  return <Sheet open={openSheet} onOpenChange={setOpenSheet}>
    <SheetContent side="bottom" className="max-h-[30rem] overflow-y-auto pb-10">
      <SheetHeader className="mt-5">
        <SheetTitle className="text-xl">Resumen de la orden</SheetTitle>
      </SheetHeader>
      <div className="grid grid-cols-1 gap-4 overflow-y-auto px-4">
        {orderedDishes.map((dish) =>
          dish.amount >= 1 && (
            <Box
              key={dish.idOrder}
              className="flex flex-row items-center justify-between w-full gap-4 p-4 border rounded-md"
            >
              <img
                src={dish.image}
                alt={`Imagen del plato ${dish.name}`}
                className="object-cover w-20 h-20 rounded-md"
              />

              <div className="flex flex-col gap-1 w-full text-left">
                <p className="text-base sm:text-lg font-semibold">{dish.name}</p>
                {dish.observations && (
                  <p className="text-sm italic">{dish.observations}</p>
                )}
                <p className="text-sm font-medium">${dish.totalToPay.toLocaleString("es-CO")}</p>
              </div>

              <div className="flex gap-2 items-center justify-center">
                <Button onClick={() => onChangeAmount("minus", dish.idOrder)} variant="outline">
                  <Minus />
                </Button>
                <span>{dish.amount}</span>
                <Button onClick={() => onChangeAmount("plus", dish.idOrder)} variant="outline">
                  <Plus />
                </Button>
              </div>
            </Box>
          )
        )}

        <Box className="flex-row justify-between items-center">
          <span className="font-semibold text-lg px-4">
            Total:
          </span>
          <Separator orientation="vertical" className="mx-4" />
          <span className="font-bold text-xl px-4">
            ${orderedDishes.reduce((acum, dish) => acum + dish.totalToPay, 0).toLocaleString("es-CO")}
          </span>
        </Box>

        <div className="flex items-center justify-center gap-4">
          <Button variant="destructive" onClick={() => onClearOrder()}>
            Vaciar
          </Button>
          <Button disabled={orderedDishes.length === 0} onClick={() => onSubmitOrder()}>
            Confirmar orden
          </Button>
        </div>

      </div>
    </SheetContent>
  </Sheet>
}
