"use client"

import { getAreas, getLastHits } from '@/app/actions/getAreas'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'


export default function Areas() {
  const { data: responses } = useQuery({
    queryKey: ['resonses'],
    queryFn: getAreas,
  })

  const { data: hits } = useQuery({
    queryKey: ['hits'],
    queryFn: getLastHits,
  })

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-2xl font-bold">Áreas</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area ID</TableHead>
            <TableHead>Area Nome</TableHead>
            <TableHead>Camera ID</TableHead>
            <TableHead>Camera Nome</TableHead>
            <TableHead>IP Maquina</TableHead>
            <TableHead>Camera Status</TableHead>
            <TableHead>Empresa Nome</TableHead>
            <TableHead>Unidade Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses?.map((response) => (
            <TableRow key={response.area_id}>
              <TableCell>{response.area_id}</TableCell>
              <TableCell>{response.area_nome}</TableCell>
              <TableCell>{response.camera_id}</TableCell>
              <TableCell>{response.camera_nome}</TableCell>
              <TableCell>{response.ip_maquina}</TableCell>
              <TableCell>{response.camera_status}</TableCell>
              <TableCell>{response.empresa_nome}</TableCell>
              <TableCell>{response.unidade_nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}