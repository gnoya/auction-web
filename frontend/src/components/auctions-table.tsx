import { useAuctions } from '@/hooks/use-auctions'
import { DataTable } from './core/data-table'
import { Auction } from '@/types/auction'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './core/data-table-column-header'
import { AuctionActions } from './auction-actions'
import { useEffect, useState } from 'react'

export function AuctionsTable() {
  const { data: auctions, isLoading, mutate, pagination } = useAuctions()
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const columns = useAuctionsTableColumns({
    currentTime,
    onDelete: mutate,
  })

  return (
    <DataTable
      toolbar={<AuctionsTableToolbar />}
      columns={columns}
      data={auctions}
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

function AuctionsTableToolbar() {
  return <div className="flex items-center justify-end"></div>
}

function useAuctionsTableColumns({
  currentTime,
  onDelete,
}: {
  currentTime: number
  onDelete?: () => void
}) {
  const columns: ColumnDef<Auction>[] = [
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" sortable={false} />
      ),
      meta: {
        columnToggleLabel: 'Title',
      },
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Description"
          sortable={false}
        />
      ),
      cell: ({ row }) => (
        <div className="max-w-40 truncate">{row.original.description}</div>
      ),
      meta: {
        columnToggleLabel: 'Description',
      },
    },
    {
      id: 'startingPrice',
      accessorKey: 'startingPrice',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Starting Price"
          sortable={false}
        />
      ),
      cell: ({ row }) => (
        <div>${row.original.startingPrice.toLocaleString('en-US')}</div>
      ),
      meta: {
        columnToggleLabel: 'Starting Price',
      },
    },
    {
      id: 'currentPrice',
      accessorKey: 'currentPrice',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Current Price"
          sortable={false}
        />
      ),
      cell: ({ row }) => (
        <div>${row.original.currentPrice.toLocaleString('en-US')}</div>
      ),
      meta: {
        columnToggleLabel: 'Current Price',
      },
    },
    {
      id: 'endTime',
      accessorKey: 'endTime',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Ends in"
          sortable={false}
        />
      ),
      cell: ({ row }) => {
        const endTime = new Date(row.original.endTime).getTime()
        const timeLeft = endTime - currentTime
        const seconds = Math.floor((timeLeft / 1000) % 60)
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
        return (
          <div>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </div>
        )
      },
      meta: {
        columnToggleLabel: 'Ends in',
      },
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Action"
          sortable={false}
        />
      ),
      cell: ({ row }) => (
        <AuctionActions auction={row.original} onDelete={onDelete} />
      ),
    },
  ]

  return columns
}
