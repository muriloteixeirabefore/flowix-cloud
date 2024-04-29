import { ReactNode } from 'react'

export function Main({ children }: { children: ReactNode }) {
  return <main className="ml-12 mt-16 h-auto w-auto p-4">{children}</main>
}
