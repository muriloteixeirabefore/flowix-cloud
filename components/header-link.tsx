'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type HeaderLinkProps = ComponentProps<typeof Link>

export function HeaderLink(props: HeaderLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      {...props}
      data-current={pathname.includes(props.href as string)}
      className="flex items-center justify-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
