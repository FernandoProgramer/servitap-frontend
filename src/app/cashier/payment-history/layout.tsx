import TitleSection from '@/components/titleSection'
import { ReactNode } from 'react'

export default function PaymentHistoryLayout({ children }: { children: ReactNode }) {
    return <TitleSection title="Historial de pagos" >
        {children}
    </TitleSection>

}
