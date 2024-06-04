import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function WebhookTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Requisição Id</TableHead>
          <TableHead>Ação</TableHead>
          <TableHead>App</TableHead>
          <TableHead>Proxima tentativa</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((call) => (
          <TableRow key={call.id}>
            <TableCell className="font-medium">{call.request_id}</TableCell>
            <TableCell>
              <pre className="text-sm text-muted-foreground">{call.action}</pre>
            </TableCell>
            <TableCell>{call.app_nome}</TableCell>
            <TableCell>{call.proxima_tentativa?.toISOString()}</TableCell>
            <TableCell>{call.created_at?.toISOString()}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" disabled>
                Visualizar
              </Button>
              <Button variant="outline" size="sm" disabled>
                Colocar no topo
              </Button>
              <Button variant="outline" size="sm" disabled>
                Cancelar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
