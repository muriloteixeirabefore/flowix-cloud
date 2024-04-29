import { MonitorSidebar } from '@/app/monitor/monitor-sidebar'
import { Header } from '@/components/header'
import { Main } from '@/components/ui/main'
import { ReactNode } from 'react'

interface PainelLayoutProps {
  children: ReactNode
}

export default async function PainelLayout({ children }: PainelLayoutProps) {
  return (
    <>
      <Header />
      <MonitorSidebar />
      <Main>{children}</Main>
    </>
  )
}
