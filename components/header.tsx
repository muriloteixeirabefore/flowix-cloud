import { NavLink } from '@/components/nav-link'
import { Separator } from '@/components/ui/separator'
import { Settings } from 'lucide-react'
import Image from 'next/image'
import { ThemeModeToggle } from './theme-mode-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Image
          src="/logo-light.svg"
          alt="Logo"
          className="size-14 dark:hidden"
          width={0}
          height={0}
          priority={true}
        />
        <Image
          src="/logo-dark.svg"
          alt="Logo"
          className="hidden size-14 dark:block"
          width={0}
          height={0}
          priority={true}
        />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink href="/ofertas">Ofertas</NavLink>
          <NavLink href="/instancias">Instancias</NavLink>
          <NavLink href="/areas">Areas</NavLink>
          <NavLink href="/fusos">Fusos</NavLink>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <ThemeModeToggle />
          <NavLink href="/configuracoes">
            <Button variant="ghost" size="icon">
              <Settings className="size-5" />
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
