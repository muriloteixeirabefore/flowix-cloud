import { addIps, getDbIps } from '@/app/actions/Ips'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Settings } from 'lucide-react'
import { toast } from 'sonner'

export function SettingsSheet() {
  const queryClient = useQueryClient()
  const { data: ips } = useQuery({
    queryKey: ['ips'],
    queryFn: () => getDbIps(),
  })

  async function handleAddIp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const newIp = form.get('newIp')

    if (ips?.includes(newIp as string)) {
      toast.error('IP já cadastrado')
      return
    }
    if (!newIp) {
      toast.error('IP inválido')
      return
    }

    const newIps = [...(ips || []), newIp as string]
    await addIps(newIps)
      .then(() => {
        toast.success('IP adicionado com sucesso')
        queryClient.invalidateQueries({ queryKey: ['ips'] })
      })
      .catch(() => {
        toast.error('Erro ao adicionar IP')
      })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="gap-2">
          Liberar IP da instância <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleAddIp}>
          <SheetHeader>
            <SheetTitle>Ips</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-3">
              <Input type="text" name="newIp" placeholder="IP" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Salvar</Button>
            </SheetClose>
          </SheetFooter>
        </form>
        <ScrollArea className="mt-20 h-96 w-auto rounded-md border">
          <div className="p-4">
            {ips?.map((item) => (
              <>
                <div key={item} className="text-center text-sm">
                  {item}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
