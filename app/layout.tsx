import { cn } from '@/lib/utils'

import '@/app/globals.css'
import Providers from '@/app/providers'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Flowix Cloud',
  description: 'Painel de controle Interno Flowix',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
