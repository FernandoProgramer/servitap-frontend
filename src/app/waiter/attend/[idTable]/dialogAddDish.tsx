import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DishesInterface } from './page';
import { ChangeEvent } from 'react';


interface DialogAddDishProps {
    openModal: null | number
    dish: DishesInterface
    setOpenModal: (data: null | number) => void
    handleAddDish: (dish: DishesInterface) => void
    onChangeObservation: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
export default function DialogAddDish({ onChangeObservation, openModal, dish, setOpenModal, handleAddDish }: DialogAddDishProps) {

    return <Dialog
        open={openModal === dish.id}
        onOpenChange={(open) => {
            if (!open) setOpenModal(null);
        }}
    >
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{dish.name}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-4">
                <img
                    className="object-cover w-full rounded-md"
                    src={dish.image}
                    alt={`Imagen de ${dish.name}`}
                />
                <span className="text-lg font-bold">
                    Precio: ${dish.price.toLocaleString()}
                </span>

                <div className="flex gap-1 flex-col text-left">
                    <Label>
                        ¿Alguna observación adicional? (opcional)
                    </Label>
                    <Textarea onBlur={(e) => onChangeObservation(e)} />
                </div>

            </div>

            <DialogFooter>
                <div className="flex gap-4 items-center justify-center w-full">
                    <Button type="button" variant="destructive" onClick={() => setOpenModal(null)}>
                        Cerrar
                    </Button>
                    <Button type="button" onClick={() => handleAddDish(dish)}>
                        Guardar
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
