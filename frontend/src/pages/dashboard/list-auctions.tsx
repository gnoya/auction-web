import { AuctionsTable } from '@/components/auctions-table'
import { useTitle } from '@/hooks/core/use-title'

export function ListAuctions() {
  useTitle('Auctions')

  return <AuctionsTable />
}
