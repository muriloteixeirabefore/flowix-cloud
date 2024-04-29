import { SidebarLink } from '@/components/sidebar-link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Globe, Settings } from 'lucide-react'

export function UsefulSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-12 border-r bg-inherit pb-4 pt-16">
      <div className="flex h-full flex-col justify-between">
        <nav className="justify-center space-y-6 pt-4">
          <TooltipProvider>
            <Tooltip>
              <SidebarLink href="/useful">
                <TooltipTrigger asChild>
                  <Globe />
                </TooltipTrigger>
              </SidebarLink>
              <TooltipContent side="right">Fusos</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="space-y-4">
          <SidebarLink href="/monitor/configuracoes">
            <Settings />
          </SidebarLink>
        </nav>
      </div>
    </aside>
  )
}
