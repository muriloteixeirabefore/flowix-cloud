import { H1 } from '@/components/ui/h1'
import { P } from '@/components/ui/p'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="text-9xl font-extrabold text-gray-900 dark:text-gray-100">
        404
      </span>
      <H1>Pagina não encontrada</H1>
      <P>
        Volte para o{' '}
        <Link className="text-sky-500 dark:text-sky-400" href="/">
          Inicio
        </Link>
        .
      </P>
    </div>
  )
}
