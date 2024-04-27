import { NavLink } from '@/components/nav-link'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard, Settings } from 'lucide-react'

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <LayoutDashboard className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink href="/ofertas">Ofertas</NavLink>
          <NavLink href="/instancias">Instancias</NavLink>
          <NavLink href="/areas">Areas</NavLink>
          <NavLink href="/fusos">Fusos</NavLink>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <NavLink href="/configuracoes">
            <Settings className="h-6 w-6" />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
