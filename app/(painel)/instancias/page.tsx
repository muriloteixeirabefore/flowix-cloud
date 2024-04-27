'use client'

import { getInstanceLogs } from '@/app/actions/getInstanceLogs'
import { getInstances } from '@/app/actions/getInstances'
import { Button } from '@/components/ui/button'
import { H4 } from '@/components/ui/h4'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CopyIcon,
  FileTextIcon,
  OpenInNewWindowIcon,
  TrashIcon,
} from '@radix-ui/react-icons'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { deleteVastAiInstance } from '@/app/actions/deleteVastAiInstance'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { P } from '@/components/ui/p'
import { Ul } from '@/components/ui/ul'

export default function InstancePage() {
  // useQuery to getInstances
  const { data: instances } = useQuery({
    queryKey: ['instances'], // "instances" is a unique identifier for this query
    queryFn: () => getInstances(),
    refetchInterval: 1000 * 5, // refetch every 5 seconds
  })

  return (
    <div className="mx-5 my-5 w-auto space-y-5">
      <H4>Instâncias</H4>
      <Table>
        <TableCaption>Lista de instancias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>State</TableHead>
            <TableHead>GPU</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>Specs</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status Message</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instances &&
            instances.map((instance: any) => (
              <TableRow key={instance.id}>
                <TableCell>
                  <Link href={`/instancias/${instance.id}`}>
                    <Button
                      variant="ghost"
                      className="flex flex-row items-center"
                    >
                      {instance.label}{' '}
                      <OpenInNewWindowIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{instance.actual_status}</TableCell>
                <TableCell>{instance.cur_state}</TableCell>
                <TableCell>{instance.gpu}</TableCell>
                <TableCell>{instance.cpu}</TableCell>
                <TableCell>{instance.ram}</TableCell>
                <TableCell>{instance.specs}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(instance.ip)

                      toast.success('IP copiado para a área de transferência')
                    }}
                  >
                    {instance.ip} <CopyIcon className="ml-2 h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell>{instance.location}</TableCell>
                <TableCell>{instance.status_msg}</TableCell>
                <TableCell className="flex flex-row space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            getInstanceLogs(instance.id).then(
                              ({ result_url: resultUrl, success }) => {
                                if (success) {
                                  const a = document.createElement('a')
                                  a.href = resultUrl
                                  a.download = 'logs.txt'
                                  a.target = '_blank'
                                  a.click()
                                } else {
                                  alert('Failed to get logs')
                                }
                              },
                            )
                          }}
                        >
                          <FileTextIcon />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <P>Ver logs</P>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="destructive">
                        <TrashIcon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          <Ul>
                            <li>Nome: {instance.label}</li>
                            <li>Status: {instance.actual_status}</li>
                            <li>State: {instance.cur_state}</li>
                            <li>Specs: {instance.specs}</li>
                            <li>IP: {instance.ip}</li>
                            <li>Location: {instance.location}</li>
                          </Ul>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteVastAiInstance(instance.id).then(
                              (success) => {
                                if (success) {
                                  toast.success(
                                    'Instância deletada com sucesso',
                                  )
                                } else {
                                  toast.error('Falha ao deletar instância')
                                }
                              },
                            )
                          }
                        >
                          Deletar {instance.label}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
