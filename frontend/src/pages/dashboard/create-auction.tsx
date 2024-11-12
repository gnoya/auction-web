import { AuctionForm } from '@/components/forms/auction-form'
import { Card, CardContent } from '@/components/ui/card'
import { useTitle } from '@/hooks/core/use-title'
import { useCreateAuction } from '@/hooks/use-create-auction'

export function CreateAuction() {
  useTitle('Create auction')
  const { isLoading, handleCreateAuction } = useCreateAuction()

  return (
    <Card className="max-w-xl pt-8">
      <CardContent>
        <AuctionForm onContinue={handleCreateAuction} isLoading={isLoading} />
      </CardContent>
    </Card>
  )
}
