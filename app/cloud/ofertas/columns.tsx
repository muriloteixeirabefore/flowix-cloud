import { ReserveDialog } from '@/app/cloud/ofertas/reserve-dialog'
import { DataTableColumnHeaderSort } from '@/components/data-table/column-header-sort'
import { ColumnDef } from '@tanstack/react-table'

export interface OfferData {
  gpu_data: string
  cpu_data: string
  max_cameras: number
  custo_hora: string
  custo_por_camera_dia: string
  custo_dia: string
  custo_mes: string
  custo_camera_mes: string
  inet_down: string
  reliability: string
  public_ipaddr: string
  geolocation: string
  docker_tags?: string[]
  comand: string
  offer_id: string
}

export const columns: ColumnDef<OfferData>[] = [
  {
    accessorKey: 'gpu_data',
    header: 'GPU',
  },
  {
    accessorKey: 'cpu_data',
    header: 'CPU',
  },
  {
    accessorKey: 'max_cameras',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="MaxCams" />
    ),
  },
  {
    accessorKey: 'custo_hora',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Custo Hora" />
    ),
  },
  {
    accessorKey: 'custo_por_camera_dia',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Custo Cam/Dia" />
    ),
  },
  {
    accessorKey: 'custo_dia',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Custo Dia" />
    ),
  },
  {
    accessorKey: 'custo_mes',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Custo Mês" />
    ),
  },
  {
    accessorKey: 'custo_camera_mes',
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Custo Cam/Mês" />
    ),
  },
  {
    accessorKey: 'inet_down',
    header: 'Download',
  },
  {
    accessorKey: 'reliability',
    header: 'Confiabilidade',
  },
  {
    accessorKey: 'public_ipaddr',
    header: 'IP',
  },
  {
    accessorKey: 'geolocation',
    header: 'Localização',
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => (
      <ReserveDialog
        qtd_cameras={row.original.max_cameras}
        docker_tags={row.original.docker_tags}
        offer_id={row.original.offer_id}
      />
    ),
  },
]
