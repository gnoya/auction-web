import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { LogOut, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Link, useNavigate } from 'react-router-dom'
import { clearSWRCache } from '@/lib/clear-swr-cache'
import { useTheme } from '@/hooks/core/use-theme'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { getInitials } from '@/lib/get-initials'

interface HeaderProps {
  title: string
  onSidebarButtonClick: () => void
}
export function Header({ title, onSidebarButtonClick }: HeaderProps) {
  return (
    <header className="flex h-full items-center justify-between gap-4 border-b bg-background px-8">
      <Button
        variant="outline"
        size="icon"
        onClick={onSidebarButtonClick}
        className="h-10 w-10 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Typography variant="h2" className="text-foreground">
        {title}
      </Typography>
      <div className="inline-flex items-center gap-x-4 justify-self-end">
        <AvatarMenu />
      </div>
    </header>
  )
}

function AvatarMenu() {
  const { user, invalidate } = useAuth()
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  async function handleLogout() {
    await invalidate()
    await clearSWRCache()
    navigate('/auth', { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-max px-2 text-left">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/200/200" alt={user?.name} />
            <AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
          </Avatar>
          <div className="ml-2 hidden xl:block">
            <p>{user?.name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Menú</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as typeof theme)}
        >
          <DropdownMenuRadioItem value="light">
            Light theme
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark theme</DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem value="system">
            Tema automático
          </DropdownMenuRadioItem> */}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
