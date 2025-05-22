import { Button } from '@/components/ui/button'
import { InputSearch } from '@/components/ui/input'
import { FileDown } from 'lucide-react'

import DataTable from '@/components/datatable'
import { columns } from './columns'
import { getPaymentHistory } from './history-payments'

export default async function PaymentHistoryPage() {
    const users = await getPaymentHistory();
    return <>
        <div className="flex justify-between gap-2">
            <InputSearch className="sm:max-w-[3rem] md:max-w-sm" />
            <Button variant="outline">
                <FileDown />
                Exportar
            </Button>
        </div>
        <div className="w-full">

            <DataTable columns={columns} data={users} caption="Historial de pagos" />

        </div>
    </>
}
