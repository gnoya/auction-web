import { useTitle } from '@/hooks/core/use-title'
import { AuctionsTable } from '@/components/auctions-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useMyAuctions } from '@/hooks/use-my-auctions'

export function MyAuctions() {
  useTitle('My Auctions')

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My available auctions</CardTitle>
      </CardHeader>
      <CardContent>
        <AuctionsTable auctionFetchHook={useMyAuctions} />
      </CardContent>
    </Card>
  )
}
