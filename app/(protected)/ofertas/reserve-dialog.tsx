"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleDollarSign } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { get_machine_label } from "@/app/utils"
import { startVastAiMachine } from "@/app/actions/startVastAiMachine"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ReserveDialogProps {
  qtd_cameras: number
  docker_tags?: string[]
  offer_id: string
}

const reserveFormSchema = z.object({
  machine_name: z.string(),
  docker_image: z.string(),
  qtd_cameras: z.number(), 
  command: z.string(),
})

export function ReserveDialog({ qtd_cameras, docker_tags, offer_id }: ReserveDialogProps) {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(reserveFormSchema),
    defaultValues: {
      machine_name: get_machine_label(),
      docker_image: docker_tags?.[0] || '',
      qtd_cameras: qtd_cameras,
      command: `screen -dmS SESSION screen -S SESSION -X stuff 'python3 /Flowix/FlowixStart.py --cameras ${qtd_cameras} &\\n'`,
    },
  })
  
  function onSubmitHandler(values: z.infer<typeof reserveFormSchema>) {
    const payload = {
      machine_name: values.machine_name,
      docker_image: values.docker_image,
      on_start_script: values.command.replace(/\\n/g, '\n'),
      ask_contract_id: offer_id,
    }
    startVastAiMachine(payload).then((response) => {
        toast('Máquina reservada com sucesso!', {
          action: {
            label: 'Ver Instancia',
              onClick: () => router.push('/instancias/' + response.new_contract)
          }
        })
        router.push('/instancias')
      }
      ).catch((error) => {
          toast.error('Erro ao reservar máquina: ' + error)
        })
      }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded-md space-x-1">
          <CircleDollarSign className="w-4 h-4" />
          <span>Reservar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Reservar Máquina</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="machine_name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="machine-name" className="text-right">
                        Nome da máquina
                      </FormLabel>
                      <FormControl>
                        <Input className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="docker_image"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="docker-image" className="text-right">
                        Imagem Docker
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione uma imagem Docker" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {docker_tags?.map((image) => (
                            <SelectItem key={image} value={`${image}`}>
                              {image}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="command"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor="command" className="text-right">
                        Comando
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Comando para iniciar o container"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-red-500 hover:bg-red-700 text-white shadow-md rounded-md space-x-1">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white shadow-md rounded-md space-x-1">
                <CircleDollarSign className="w-4 h-4" />
                <span>Reservar</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
