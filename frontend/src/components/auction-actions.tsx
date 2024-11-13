import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Auction } from '@/types/auction'
import { Typography } from './ui/typography'

interface AuctionActionsProps {
  auction: Auction
}
export function AuctionActions({ auction }: AuctionActionsProps) {
  return (
    <div className="flex gap-2 align-middle">
      <Link to={`/dashboard/auctions/${auction.id}`} className="flex gap-1">
        <Eye className="h-4 w-4 self-center text-accent" />
        <Typography className="text-accent">View</Typography>
      </Link>
    </div>
  )
}
