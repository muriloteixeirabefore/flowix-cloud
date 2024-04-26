import Navbar from '@/components/navbar'
import { ReactNode } from 'react'

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {

  return (
        <>
        <Navbar />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
      </>
    )
  }