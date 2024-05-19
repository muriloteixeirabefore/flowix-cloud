'use client'

import { queryClient } from '@/lib/tanstack'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="flowix-cloud-theme"
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster richColors />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
