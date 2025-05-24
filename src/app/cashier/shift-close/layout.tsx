import TitleSection from '@/components/titleSection'
import React, { ReactNode } from 'react'

export default function ShiftCloseLayout({ children }: { children: ReactNode }) {
    return <TitleSection title="Cierre de turno" >
        {children}
    </TitleSection>
}
