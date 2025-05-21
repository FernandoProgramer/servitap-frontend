import { Button } from '@/components/ui/button'
import { Input, InputSearch } from '@/components/ui/input'
import { FileDown, Search } from 'lucide-react'
import React from 'react'

export default function PaymentHistoryPage() {
    return <>
        <div className="flex justify-between">
            <InputSearch />
            <Button variant="outline">
                <FileDown />
                Exportar
            </Button>
        </div>

    </>
}
