import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Typography } from '@/components/ui/typography'

interface DatePickerProps {
  label: string
  defaultDate?: Date
  onSelect: (date: Date) => void
  className?: string
}

export function DatePicker({
  defaultDate,
  label,
  className,
  onSelect,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(defaultDate)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="calendar"
          className={cn(
            'relative w-40 justify-start gap-2 text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CalendarIcon />
          {label && (
            <Typography className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm font-medium leading-none text-muted-foreground">
              {label}
            </Typography>
          )}

          {date && format(date, 'MM/dd/yyyy')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (!newDate) return

            setDate(newDate)
            onSelect(newDate)
            setIsOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
