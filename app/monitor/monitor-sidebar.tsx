import { SidebarLink } from '@/components/sidebar-link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LucideCamera, MonitorPlay, Settings, WebhookIcon } from 'lucide-react'

export function MonitorSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-12 border-r bg-inherit pb-4 pt-16">
      <div className="flex h-full flex-col justify-between">
        <nav className="justify-center space-y-6 pt-4">
          <TooltipProvider>
            <Tooltip>
              <SidebarLink href="/monitor">
                <TooltipTrigger asChild>
                  <LucideCamera />
                </TooltipTrigger>
              </SidebarLink>
              <TooltipContent side="right">Câmeras</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <SidebarLink href="/monitor/areas">
                <TooltipTrigger asChild>
                  <MonitorPlay />
                </TooltipTrigger>
              </SidebarLink>
              <TooltipContent side="right">Instâncias</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <SidebarLink href="/monitor/webhookCalls">
                <TooltipTrigger asChild>
                  <WebhookIcon />
                </TooltipTrigger>
              </SidebarLink>
              <TooltipContent side="right">Webhook</TooltipContent>
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
