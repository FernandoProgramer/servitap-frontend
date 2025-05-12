import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <h1>Seccion para autenticaciones</h1>
            {children}
        </div>
    )
}
