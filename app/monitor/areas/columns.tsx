import { DataTableColumnHeaderSort } from '@/components/data-table/column-header-sort'
import { ColumnDef } from '@tanstack/react-table'

export interface AreaData {
  area_id?: number
  area_nome?: string
  camera_id?: number
  empresa_nome?: string
  unidade_nome?: string
  timestamp_bsb?: string
}

export const columns: ColumnDef<AreaData>[] = [
  {
    accessorKey: 'area_id',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue('area_id')}</div>,
  },
  {
    accessorKey: 'area_nome',
    header: 'Area',
    cell: ({ row }) => <div>{row.getValue('area_nome')}</div>,
  },
  {
    accessorKey: 'camera_id',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Cam ID" />
    ),
    cell: ({ row }) => <div>{row.getValue('camera_id')}</div>,
  },
  {
    accessorKey: 'unidade_nome',
    header: 'Unidade',
    cell: ({ row }) => <div>{row.getValue('unidade_nome')}</div>,
  },
  {
    accessorKey: 'empresa_nome',
    header: 'Empresa',
    cell: ({ row }) => <div>{row.getValue('empresa_nome')}</div>,
  },
  {
    accessorKey: 'timestamp_bsb',
    header: ({ column }) => (
      <DataTableColumnHeaderSort
        column={column}
        title="Último registro (BSB)"
      />
    ),
    cell: ({ row }) => {
      if (!row.getValue('timestamp_bsb')) {
        return <div>Indefinido</div>
      }

      return (
        <div>
          {new Date(row.getValue('timestamp_bsb')).toLocaleString('pt-BR')}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (!row.getValue('timestamp_bsb')) {
        return <div>Indefinido</div>
      }

      const lastHit = new Date(row.getValue('timestamp_bsb'))
      const now = new Date()
      const diff = now.getTime() - lastHit.getTime()
      const diffInMinutes = diff / 1000 / 60

      if (now.getDate() !== lastHit.getDate()) {
        return <div className="text-red-500">Sem registro no dia</div>
      } else if (diffInMinutes < 30) {
        return <div className="text-green-500">Inferior a 30 minutos</div>
      } else if (diffInMinutes >= 30) {
        return <div className="text-yellow-500">Superior a 30 minutos</div>
      } else {
        return <div>Erro</div>
      }
    },
  },
]
