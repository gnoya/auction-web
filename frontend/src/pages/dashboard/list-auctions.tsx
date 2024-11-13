import { useTitle } from '@/hooks/core/use-title'
import { AuctionsTable } from '@/components/auctions-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ListAuctions() {
  useTitle('Auctions')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available auctions</CardTitle>
      </CardHeader>
      <CardContent>
        <AuctionsTable />
      </CardContent>
    </Card>
  )
}
