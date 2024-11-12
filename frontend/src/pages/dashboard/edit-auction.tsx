import { AuctionForm } from '@/components/forms/auction-form'
import { useTitle } from '@/hooks/core/use-title'
import { useAuction } from '@/hooks/use-auction'
import { useEditAuction } from '@/hooks/use-edit-auction'
import { useParams } from 'react-router-dom'

export function EditAuction() {
  useTitle('Edit auction')
  const { id: auctionId = '' } = useParams()
  const { data: auction } = useAuction(+auctionId)
  const { isLoading, handleEditAuction } = useEditAuction(+auctionId)

  return (
    auction && (
      <AuctionForm
        auction={auction}
        onContinue={handleEditAuction}
        isLoading={isLoading}
        buttonLabel="Update"
      />
    )
  )
}
