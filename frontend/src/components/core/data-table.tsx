import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTablePagination } from '@/components/core/data-table-pagination'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  isLoading?: boolean
  currentPage?: number
  totalPages?: number
  onNextPageClick?: () => void
  onPreviousPageClick?: () => void
  onFirstPageClick?: () => void
  onLastPageClick?: () => void
  itemsPerPage?: number
  onItemsPerPageChange?: (itemsPerPage: number) => void
  toolbar?: React.ReactNode
}
export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  itemsPerPage,
  onItemsPerPageChange,
  totalPages,
  currentPage,
  onFirstPageClick,
  onLastPageClick,
  onPreviousPageClick,
  onNextPageClick,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="grid gap-4">
      {toolbar}
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
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: itemsPerPage || 10 }).map((_, index) => (
              <TableRow key={index} className="animate-in fade-in">
                {table.getVisibleFlatColumns().map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton className="h-5" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="animate-in fade-in"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="animate-in fade-in">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {currentPage ? (
        <DataTablePagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onItemsPerPageChange={onItemsPerPageChange}
          onFirstPageClick={onFirstPageClick}
          onLastPageClick={onLastPageClick}
          onPreviousPageClick={onPreviousPageClick}
          onNextPageClick={onNextPageClick}
        />
      ) : null}
    </div>
  )
}
