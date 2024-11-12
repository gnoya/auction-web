import { Eye } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Auction } from '@/types/auction'
import { useErrorHandler } from '@/hooks/core/use-error-handler'
import { ActionModal } from './core/action-modal'

interface AuctionActionsProps {
  auction: Auction
  onDelete?: () => void
}
export function AuctionActions({ auction, onDelete }: AuctionActionsProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const handleError = useErrorHandler()

  const handleDelete = useCallback(async () => {
    try {
      toast.success('Auction has been deleted correctly.')
      onDelete?.()
    } catch (error) {
      handleError(error)
    }
  }, [onDelete, handleError])

  return (
    <div className="flex gap-2 align-middle">
      <Link to={`${auction.id}/edit`} className="flex gap-1">
        <Eye className="h-4 w-4 self-center" />
        View
      </Link>

      <ActionModal
        title="Eliminar integración por billetera"
        message="¿Estás seguro de que deseas eliminar esta integración por billetera?"
        show={deleteModalOpen}
        actionLabel="Eliminar"
        onAction={() => {
          handleDelete()
          setDeleteModalOpen(false)
        }}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  )
}
