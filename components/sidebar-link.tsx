'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type SidebarLinkProps = ComponentProps<typeof Link>

export function SidebarLink(props: SidebarLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      {...props}
      data-current={props.href === pathname}
      className="flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
