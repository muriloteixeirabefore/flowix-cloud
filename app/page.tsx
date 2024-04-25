"use client"

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-2xl font-bold">Home</h1>

      <div className="mt-8 space-x-4">
        <Link className="text-blue-500" href="/areas">
          Áreas
        </Link>
        <Link className="text-blue-500" href="/fusos">
          Fusos
        </Link>
        <Link className="text-blue-500" href="/ofertas">
          Ofertas
        </Link>
      </div>
    </main>
  )
}
