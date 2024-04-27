import { Header } from '@/components/header'
import { ReactNode } from 'react'

interface PainelLayoutProps {
  children: ReactNode
}

export default async function PainelLayout({ children }: PainelLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
