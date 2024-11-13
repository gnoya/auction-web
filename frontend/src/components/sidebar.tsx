import { useMediaQuery } from '@/hooks/core/use-media-query'
import { useNavigationLinks } from '@/hooks/use-navigation-links'
import React, { Dispatch, SetStateAction } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface SidebarProps {
  open?: boolean
  onOpenChange?: Dispatch<SetStateAction<boolean>>
}
export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const isDesktop = useMediaQuery('md')

  return isDesktop ? (
    <SidebarContent />
  ) : (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigation Menu</SheetDescription>
        </SheetHeader>
        <SidebarContent onLinkClick={() => onOpenChange?.(false)} />
      </SheetContent>
    </Sheet>
  )
}

interface SidebarContentProps {
  onLinkClick?: () => void
}
function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const links = useNavigationLinks()

  return (
    <nav className="row-span-full grid h-full grid-rows-[auto_1fr] overflow-hidden overflow-y-auto p-4 pt-28 md:border-r">
      <ul className="space-y-2">
        {links.map((link) => (
          <SidebarButton
            key={link.href}
            to={link.href}
            title={link.label}
            icon={link.icon}
            onClick={onLinkClick}
          />
        ))}
      </ul>
    </nav>
  )
}

function SidebarButton({
  icon,
  title,
  to,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  to: string
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end
      className={`grid h-[50px] rounded-md px-4 align-middle hover:bg-accent hover:text-accent-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground`}
      onClick={onClick}
    >
      <li className="flex place-items-center gap-2">
        {icon}
        <span>{title}</span>
      </li>
    </NavLink>
  )
}
