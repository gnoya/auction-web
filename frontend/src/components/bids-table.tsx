import { DataTable } from './core/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './core/data-table-column-header'
import { formatCurrency, formatDate } from '@/lib/format'
import { useBids } from '@/hooks/use-bids'
import { Bid } from '@/types/bid'

export function BidsTable({ auctionId }: { auctionId: number }) {
  const { data: bids, isLoading, pagination } = useBids(auctionId)
  const columns = useBidsTableColumns()

  return (
    <DataTable
      columns={columns}
      data={bids}
      isLoading={isLoading}
      currentPage={pagination.currentPage}
      totalPages={pagination.totalPages}
      onFirstPageClick={pagination.goToFirstPage}
      onPreviousPageClick={pagination.goToPreviousPage}
      onNextPageClick={pagination.goToNextPage}
      onLastPageClick={pagination.goToLastPage}
      itemsPerPage={pagination.itemsPerPage}
      onItemsPerPageChange={pagination.setItemsPerPage}
    />
  )
}

function useBidsTableColumns() {
  const columns: ColumnDef<Bid>[] = [
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" sortable={false} />
      ),
      cell: ({ row }) => formatDate(row.original.createdAt),
      meta: {
        columnToggleLabel: 'Date',
      },
    },
    {
      id: 'user.name',
      accessorKey: 'user.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" sortable={false} />
      ),
      cell: ({ row }) => row.original.user?.name,
      meta: {
        columnToggleLabel: 'User',
      },
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          sortable={false}
        />
      ),
      cell: ({ row }) => formatCurrency(row.original.amount),
      meta: {
        columnToggleLabel: 'Amount',
      },
    },
  ]

  return columns
}
