import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

function InputSearch({ className, type, ...props }: React.ComponentProps<"input">) {
  return <div className="relative md:max-w-sm w-full">
    <Input
      type="search"
      placeholder="Buscar mesa"
      className={cn("pr-8", className)}
      {...props}
    />
    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
  </div>
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input, InputSearch }
