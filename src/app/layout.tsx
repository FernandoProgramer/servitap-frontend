import { ReactNode } from "react";
import './globals.css'
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html>
    <body>
      {children}
      <Toaster/>
    </body>
  </html>
}
