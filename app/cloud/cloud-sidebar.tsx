import { SidebarLink } from '@/components/sidebar-link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DollarSign, LaptopMinimal, Settings } from 'lucide-react'

export function CloudSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-12 border-r bg-inherit pb-4 pt-16">
      <div className="flex h-full flex-col justify-between">
        <nav className="justify-center space-y-6 pt-4">
          <TooltipProvider>
            <Tooltip>
              <SidebarLink href="/cloud">
                <TooltipTrigger asChild>
                  <LaptopMinimal />
                </TooltipTrigger>
              </SidebarLink>
              <TooltipContent side="right">Instâncias</TooltipContent>
            </Tooltip>
            <Tooltip>
              <SidebarLink href="/cloud/ofertas">
                <TooltipTrigger asChild>
                  <DollarSign />
                </TooltipTrigger>
              </SidebarLink>
              <TooltipContent side="right">Ofertas</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="space-y-4">
          <SidebarLink href="/configuracoes">
            <Settings />
          </SidebarLink>
        </nav>
      </div>
    </aside>
  )
}
