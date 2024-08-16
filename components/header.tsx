import { HeaderLink } from '@/components/header-link'
import { Cloud, Monitor } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeSwitcher } from './theme-switcher'

export function Header() {
  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b bg-inherit px-5 py-3">
      <div className="flex justify-between">
        <Link
          href="https://flowix-painel.before.com.br"
          className="flex items-center"
        >
          <Image
            priority={true}
            src="/logo-flowix.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-8 w-auto object-cover"
          />
        </Link>
        <nav className="flex gap-6">
          <HeaderLink href="/cloud">
            <Cloud className="mr-0.5 size-4" />
            <span>Cloud</span>
          </HeaderLink>
          <HeaderLink href="/monitor">
            <Monitor className="mr-0.5 size-4" />
            <span>Monitor</span>
          </HeaderLink>
          {/* <HeaderLink href="/useful">
            <Wrench className="mr-0.5 size-4" />
            <span>Útilitarios</span>
          </HeaderLink> */}
        </nav>
        <nav className="flex gap-2">
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
