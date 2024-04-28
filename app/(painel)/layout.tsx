import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'

interface PainelLayoutProps {
  children: ReactNode
}

export default async function PainelLayout({ children }: PainelLayoutProps) {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-12 mt-16 h-auto w-auto p-4">{children}</main>
    </>
  )
}
