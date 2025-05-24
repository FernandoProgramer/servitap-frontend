import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'

import DataTable from '@/components/datatable'
import { columns } from './columns'
import { getPaymentHistory, HistoryPaymentsInterface } from './history-payments'

export default async function PaymentHistoryPage() {
    const payments = await getPaymentHistory();
    return <>
        <div className="flex">
            <Button variant="outline" className="ml-auto">
                <FileDown />
                Exportar
            </Button>
        </div>
        <div className="w-full">

            <DataTable<HistoryPaymentsInterface, any> columns={columns} data={payments} caption="Historial de pagos" />

        </div>
    </>
}
