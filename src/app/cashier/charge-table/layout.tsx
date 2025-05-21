import TitleSection from '@/components/titleSection'
import React, { ReactNode } from 'react'

export default function ChargeTableLayout({ children }: { children: ReactNode }) {
    return <div>
        <TitleSection title="Cobrar mesa">
            {children}
        </TitleSection>
    </div>
}
