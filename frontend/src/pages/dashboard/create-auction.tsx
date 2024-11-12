import { AuctionForm } from '@/components/forms/auction-form'
import { useTitle } from '@/hooks/core/use-title'
import { useCreateAuction } from '@/hooks/use-create-auction'

export function CreateAuction() {
  useTitle('Create auction')
  const { isLoading, handleCreateAuction } = useCreateAuction()

  return <AuctionForm onContinue={handleCreateAuction} isLoading={isLoading} />
}
