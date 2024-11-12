import { useTitle } from '@/hooks/core/use-title'
import { useAuction } from '@/hooks/use-auction'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { useUser } from '@/hooks/use-user'
import { Typography } from '@/components/ui/typography'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { BidsTable } from '@/components/bids-table'
import { PlaceBidForm } from '@/components/forms/place-bid-form'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export function Auction() {
  useTitle('Auction')
  const { user } = useAuth()
  const { id: auctionId = '0' } = useParams()
  const {
    data: auction,
    isLoading: isAuctionLoading,
    mutate: mutateAuction,
  } = useAuction(+auctionId)
  const { data: auctionUser, isLoading: isUserLoading } = useUser(
    auction?.userId,
  )
  const isMyAuction = user && auction && user.id === auction.userId

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-4">
        <Card className="relative max-w-xl flex-1">
          <LoadingOverlay visible={isAuctionLoading} />
          <CardHeader>
            <CardTitle>Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <Typography>{auction?.title}</Typography>
              <Typography>{auction?.description}</Typography>
            </div>
            {isMyAuction && (
              <Link to="./edit">
                <Button>Edit</Button>
              </Link>
            )}
          </CardContent>
        </Card>
        <Card className="relative max-w-xl flex-1">
          <LoadingOverlay visible={isUserLoading} />
          <CardHeader>
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent className="grid">
            <Typography>{auctionUser?.name}</Typography>
            <Typography>{auctionUser?.email}</Typography>
          </CardContent>
        </Card>
      </div>
      <Card key={`${auction?.currentPrice}-prices`} className="relative">
        <LoadingOverlay visible={isAuctionLoading} />
        <CardHeader>
          <CardTitle>Price</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Typography className="text-sm">
              Started: {formatCurrency(auction?.startingPrice || 0)}
            </Typography>
            <Typography className="text-xl">
              Current: {formatCurrency(auction?.currentPrice || 0)}
            </Typography>
          </div>
          {auction && !isMyAuction && (
            <PlaceBidForm
              auctionId={auction.id}
              onBid={() => {
                mutateAuction()
              }}
            />
          )}
        </CardContent>
      </Card>
      <Card key={`${auction?.currentPrice}-bids`}>
        <CardHeader>
          <CardTitle>Bids</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          {auction && <BidsTable auctionId={auction.id} />}
        </CardContent>
      </Card>
    </div>
  )
}
