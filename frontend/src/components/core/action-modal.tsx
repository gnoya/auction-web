import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Typography } from '@/components/ui/typography'

interface ActionModalProps {
  title: string
  message: string
  show: boolean
  cancelLabel?: string
  actionLabel?: string
  onCancel: () => void
  onAction: () => void
}

export function ActionModal({
  title,
  message,
  show,
  cancelLabel,
  actionLabel,
  onCancel,
  onAction,
}: ActionModalProps) {
  return (
    <Dialog open={show}>
      <DialogContent aria-describedby="idk" className="w-11/12 max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <Typography variant="p" className="text-center">
            {message}
          </Typography>
        </div>

        <DialogFooter className="items-center gap-2 sm:justify-around">
          <Button variant="secondary" className="w-36" onClick={onCancel}>
            {cancelLabel || 'Cancelar'}
          </Button>
          <Button className="w-36" onClick={onAction}>
            {actionLabel || 'Continuar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
