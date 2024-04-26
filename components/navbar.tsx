import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Navbar({ className, ...props }: React.HTMLAttributes<HTMLElement>): JSX.Element {
    return (
        <div className="hidden flex-col md:flex">
        <div className="border-b ">
          <div className="flex h-16 items-center px-4">
            <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            <Link
                href="/ofertas"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Ofertas
            </Link>
            <Link
                href="/instancias"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Instancias
            </Link>
            <Link
                href="/areas"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Areas
            </Link>
            <Link
                href="/fusos"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Fusos
            </Link>
            <Link
                href="/configuracoes"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Configurações
            </Link>
        </nav>
            <div className="ml-auto flex items-center space-x-4">
            </div>
          </div>
        </div>
      </div>
    )
}