"use client"

import { getAreas } from '@/app/actions/getAreas'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'


export default function Areas() {
  const { data: areas } = useQuery({ 
    queryKey: ['areas'], 
    queryFn: () => getAreas(),
  })

  console.log('areas', areas)

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-2xl font-bold">Áreas</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas?.map((area) => (
            <TableRow key={area.id}>
              <TableCell>{area.id}</TableCell>
              <TableCell>{area.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
  )
}