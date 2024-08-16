import { DataTableColumnHeaderSort } from '@/components/data-table/column-header-sort'
import { ColumnDef } from '@tanstack/react-table'
import { LucideLink2 } from 'lucide-react'

export interface CameraData {
  camera_id?: number
  camera_nome?: string
  camera_status?: string
  empresa_nome?: string
  unidade_nome?: string
  camera_url?: string
  maquina_label?: string
}

export const columns: ColumnDef<CameraData>[] = [
  {
    accessorKey: 'camera_id',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue('camera_id')}</div>,
  },
  {
    accessorKey: 'camera_nome',
    header: 'Camera',
    cell: ({ row }) => <div>{row.getValue('camera_nome')}</div>,
    meta: {
      filterVariant: 'search',
    },
  },
  {
    accessorKey: 'camera_status',
    header: 'Status',
    cell: ({ row }) => <div>{row.getValue('camera_status')}</div>,
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'unidade_nome',
    header: 'Unidade',
    cell: ({ row }) => <div>{row.getValue('unidade_nome')}</div>,
    meta: {
      filterVariant: 'search',
    },
  },
  {
    accessorKey: 'empresa_nome',
    header: 'Empresa',
    cell: ({ row }) => <div>{row.getValue('empresa_nome')}</div>,
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'maquina_label',
    header: 'Maquina',
    cell: ({ row }) => <div>{row.getValue('maquina_label')}</div>,
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'camera_url',
    header: 'URL',
    cell: ({ row }) => (
      <div>
        <a href={row.getValue('camera_url')}>
          <LucideLink2 />
        </a>
      </div>
    ),
  },
]
