import { NavLink } from '@/components/nav-link'
import {
  DollarSign,
  Globe,
  LaptopMinimal,
  MonitorPlay,
  Settings,
} from 'lucide-react'
import { Button } from './ui/button'

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-12 border-r bg-inherit pb-4 pt-20">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <NavLink href="/ofertas">
            <Button variant="ghost" size="icon">
              <DollarSign />
            </Button>
          </NavLink>
          <NavLink href="/instancias">
            <Button variant="ghost" size="icon">
              <LaptopMinimal />
            </Button>
          </NavLink>
          <NavLink href="/areas">
            <Button variant="ghost" size="icon">
              <MonitorPlay />
            </Button>
          </NavLink>
          <NavLink href="/fusos">
            <Button variant="ghost" size="icon">
              <Globe />
            </Button>
          </NavLink>
        </div>
        <div className="space-y-4">
          <NavLink href="/configuracoes">
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}
