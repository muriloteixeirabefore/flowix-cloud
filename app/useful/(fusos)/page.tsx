'use client'

import { getFusos } from '@/app/actions/getFusos'
import { H4 } from '@/components/ui/h4'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'

export default function Fusos() {
  const { data: response } = useQuery({
    queryKey: ['fusos'],
    queryFn: () => getFusos(),
  })

  return (
    <div className="space-y-5">
      <H4>Fusos</H4>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fuso</TableHead>
            <TableHead>Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response?.fusos.map((fuso) => (
            <TableRow key={fuso._id}>
              <TableCell>{fuso._id}</TableCell>
              <TableCell>{fuso.fuso}</TableCell>
              <TableCell>{fuso.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
