'use client'

import { getAreas } from '@/app/actions/getAreas'
import { AreaData, columns } from '@/app/monitor/areas/columns'
import { DataTable } from '@/components/data-table/data-table'
import { H4 } from '@/components/ui/h4'
import { useQuery } from '@tanstack/react-query'

export default function AreasPage() {
  const { data } = useQuery({
    queryKey: ['responses'],
    queryFn: () => getAreas(),
    initialData: [],
  })

  return (
    <div className="space-y-5">
      <H4>Áreas</H4>
      {/* <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter area id..."
            value={
              (table.getColumn('area_id')?.getFilterValue() as integer) ?? ''
            }
            onChange={(event) =>
              table.getColumn('area_id')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {table.getColumn('ip_maquina') && (
            <DataTableFacetedFilter
              column={table.getColumn('camera_status')}
              title="IP Maquina"
              options={[
                { value: '123456', label: '123456' },
                { value: '654321', label: '654321' },
              ]}
            />
          )}
          {table.getColumn('camera_status') && (
            <DataTableFacetedFilter
              column={table.getColumn('camera_status')}
              title="Camera Status"
              options={[
                { value: 'processing', label: 'Processing' },
                { value: 'idle', label: 'Idle' },
                { value: 'queued', label: 'Queued' },
                { value: 'online', label: 'online' },
              ]}
            />
          )}
          {table.getColumn('unidade_nome') && (
            <DataTableFacetedFilter
              column={table.getColumn('unidade_nome')}
              title="Unidade"
              options={[
                { value: 'foo', label: 'Foo' },
                { value: 'bar', label: 'Bar' },
              ]}
            />
          )}
          {table.getColumn('empresa_nome') && (
            <DataTableFacetedFilter
              column={table.getColumn('empresa_nome')}
              title="Empresa"
              options={[
                { value: 'foo', label: 'Foo' },
                { value: 'bar', label: 'Bar' },
              ]}
            />
          )}
        </div>
      </div> */}
      <DataTable<AreaData, keyof AreaData> columns={columns} data={data} />
    </div>
  )
}
