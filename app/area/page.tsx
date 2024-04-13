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
import { useQuery } from "@tanstack/react-query"
import { Settings2 } from "lucide-react"
import { useState } from "react"
import { getAreas } from "../actions/getAreas"
import { integer } from "@opensearch-project/opensearch/api/types"

interface Data {
  area_id?: number
  area_nome?: string
  camera_id?: number
  camera_nome?: string
  ip_maquina?: string
  camera_status?: string
  camera_created_at?: string
  empresa_nome?: string
  unidade_nome?: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "area_id",
    header: ({ column }) => (
      <DataTableColumnHeaderSort column={column} title="Area Id" />
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
      <DataTableColumnHeaderSort column={column} title="Camera Id" />
    ),
    cell: ({ row }) => <div>{row.getValue("camera_id")}</div>,
  },
  {
    accessorKey: "camera_nome",
    header: "Camera",
    cell: ({ row }) => <div>{row.getValue("camera_nome")}</div>,
  },
  {
    accessorKey: "ip_maquina",
    header: "IP Maquina",
    cell: ({ row }) => <div>{row.getValue("ip_maquina")}</div>,
  },
  {
    accessorKey: "camera_status",
    header: "Camera Status",
    cell: ({ row }) => <div>{row.getValue("camera_status")}</div>,
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
]

export default function DataTableDemo() {
  const { data } = useQuery({
    queryKey: ['responses'],
    queryFn: () => getAreas(),
    initialData: [
      {
        area_id: 1,
        area_nome: "Area 1",
        camera_id: 1,
        camera_nome: "Camera 1",
        ip_maquina: "123456",
        camera_status: "online",
        camera_created_at: "2021-09-01",
        empresa_nome: "Empresa 1",
        unidade_nome: "Unidade 1",
      },
      {
        area_id: 2,
        area_nome: "Area 2",
        camera_id: 2,
        camera_nome: "Camera 2",
        ip_maquina: "123456",
        camera_status: "offline",
        camera_created_at: "2021-09-01",
        empresa_nome: "Empresa 2",
        unidade_nome: "Unidade 2",
      },
      {
        area_id: 3,
        area_nome: "Area 3",
        camera_id: 3,
        camera_nome: "Camera 3",
        ip_maquina: "123456",
        camera_status: "offline",
        camera_created_at: "2021-09-01",
        empresa_nome: "Empresa 3",
        unidade_nome: "Unidade 3",
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
    <div className="w-auto mx-80">
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
                  key={row.id}
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
