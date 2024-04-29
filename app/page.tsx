'use client'

import { H1 } from '@/components/ui/h1'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <H1>Home</H1>

      <div className="mt-8 space-x-4">
        <Link className="text-blue-500" href="/cloud">
          Painel
        </Link>
      </div>
    </main>
  )
}
