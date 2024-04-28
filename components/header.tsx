import { NavLink } from '@/components/nav-link'
import {
  DollarSign,
  Globe,
  LaptopMinimal,
  MonitorPlay,
  Settings,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeSwitcher } from './theme-switcher'
import { Button } from './ui/button'

export function Header() {
  return (
    <nav className="fixed top-0 z-50 h-16 w-full border-b bg-inherit px-5 py-3 ">
      <div className="flex justify-between">
        <Link
          href="https://flowix-painel.before.com.br"
          className="flex items-center"
        >
          <Image
            src="https://flowix-painel.before.com.br/logo1713361090828.svg"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <div className="flex gap-6">
          <NavLink href="/ofertas">
            <DollarSign className="mr-0.5 size-4" />
            <span>Ofertas</span>
          </NavLink>
          <NavLink href="/instancias">
            <LaptopMinimal className="mr-0.5 size-4" />
            <span>Instancias</span>
          </NavLink>
          <NavLink href="/areas">
            <MonitorPlay className="mr-0.5 size-4" />
            <span>Areas</span>
          </NavLink>
          <NavLink href="/fusos">
            <Globe className="mr-0.5 size-4" />
            <span>Fusos</span>
          </NavLink>
        </div>
        <div className="flex gap-2">
          <ThemeSwitcher />
          <NavLink href="/configuracoes">
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
