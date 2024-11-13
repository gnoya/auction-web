import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Auction } from '@/types/auction'

interface AuctionActionsProps {
  auction: Auction
}
export function AuctionActions({ auction }: AuctionActionsProps) {
  return (
    <div className="flex gap-2 align-middle">
      <Link to={`/dashboard/auctions/${auction.id}`} className="flex gap-1">
        <Eye className="h-4 w-4 self-center" />
        View
      </Link>
    </div>
  )
}
