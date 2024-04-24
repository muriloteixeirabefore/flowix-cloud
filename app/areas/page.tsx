"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { DataTableColumnHeaderSort } from "@/components/data-table-column-header-sort"
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { integer } from "@opensearch-project/opensearch/api/types"
import { useQuery } from "@tanstack/react-query"
import { Settings2 } from "lucide-react"
import { useState } from "react"
import { getAreas } from "../actions/getAreas"

interface Data {
  area_id?: number
  area_nome?: string
  camera_id?: number
  empresa_nome?: string
  unidade_nome?: string
  timestamp_bsb?: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "area_id",
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("area_id")}</div>,
  },
  {
    accessorKey: "area_nome",
    header: "Area",
    cell: ({ row }) => <div>{row.getValue("area_nome")}</div>,
  },
  {
    accessorKey: "camera_id",
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Cam ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("camera_id")}</div>,
  },
  {
    accessorKey: "unidade_nome",
    header: "Unidade",
    cell: ({ row }) => <div>{row.getValue("unidade_nome")}</div>
  },
  {
    accessorKey: "empresa_nome",
    header: "Empresa",
    cell: ({ row }) => <div>{row.getValue("empresa_nome")}</div>
  },
  {
    accessorKey: "timestamp_bsb",
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Último registro (BSB)" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("timestamp_bsb")) {
        return <div>Indefinido</div>
      }

      return (
        <div>
          {new Date(row.getValue("timestamp_bsb")).toLocaleString('pt-BR')}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      if (!row.getValue("timestamp_bsb")) {
        return <div>Indefinido</div>
      }

      const lastHit = new Date(row.getValue("timestamp_bsb"))
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
    }
  },
]

export default function DataTableDemo() {
  const { data } = useQuery({
    queryKey: ['responses'],
    queryFn: () => getAreas(),  
    initialData: [
      {
        area_id: 1,
        area_nome: "Foo",
        camera_id: 1,
        empresa_nome: "Bar",
        unidade_nome: "Baz",
        timestamp_bsb: "2021-09-01",
      },
      {
        area_id: 2,
        area_nome: "Bar",
        camera_id: 2,
        empresa_nome: "Foo",
        unidade_nome: "Baz",
        timestamp_bsb: "2021-09-02",
      },
      {
        area_id: 3,
        area_nome: "Baz",
        camera_id: 3,
        empresa_nome: "Foo",
        unidade_nome: "Bar",
        timestamp_bsb: "2021-09-03",
      },
    ],
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-auto mx-40">
      <div className="flex items-center justify-center py-8">
        <h1 className="text-2xl font-bold">Áreas</h1>
      </div>
      <div className="flex items-center py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter area id..."
            value={(table.getColumn("area_id")?.getFilterValue() as integer) ?? ""}
            onChange={(event) =>
              table.getColumn("area_id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {table.getColumn("ip_maquina") && (
            <DataTableFacetedFilter
              column={table.getColumn("camera_status")}
              title="IP Maquina"
              options={[
                { value: "123456", label: "123456" },
                { value: "654321", label: "654321" },
              ]}
            />
          )}
          {table.getColumn("camera_status") && (
            <DataTableFacetedFilter
              column={table.getColumn("camera_status")}
              title="Camera Status"
              options={[
                { value: "processing", label: "Processing" },
                { value: "idle", label: "Idle" },
                { value: "queued", label: "Queued" },
                { value: "online", label: "online" },
              ]}
            />
          )}
          {table.getColumn("unidade_nome") && (
            <DataTableFacetedFilter
              column={table.getColumn("unidade_nome")}
              title="Unidade"
              options={[
                { value: "foo", label: "Foo" },
                { value: "bar", label: "Bar" },
              ]}
            />
          )}
          {table.getColumn("empresa_nome") && (
            <DataTableFacetedFilter
              column={table.getColumn("empresa_nome")}
              title="Empresa"
              options={[
                { value: "foo", label: "Foo" },
                { value: "bar", label: "Bar" },
              ]}
            />
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 className="mr-2 h-4 w-4" /> Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  // Adiciona cores intercaladas para índices pares e ímpares
                  className={row.index % 2 === 0 ? "bg-white hover:bg-zinc-300" : "bg-zinc-100 hover:bg-zinc-300"}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
