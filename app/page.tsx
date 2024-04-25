"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRepositoryTags } from "./actions/getDockerImages";

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
        <Link className="text-blue-500" href="/instancias">
          Instâncias
        </Link>
      </div>
      <Button onClick={() => getRepositoryTags()}>Get Docker Images</Button>
    </main>
  )
}
