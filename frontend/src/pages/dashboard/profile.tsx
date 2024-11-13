import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useTitle } from '@/hooks/core/use-title'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/get-initials'

export function Profile() {
  useTitle('Profile')
  const { user } = useAuth()

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Personal info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap place-items-center gap-8">
        <div className="h-28 w-28 text-left">
          <Avatar className="h-full w-full rounded-full">
            <AvatarImage
              src="https://picsum.photos/200/200"
              alt={user?.name}
              className="rounded-full"
            />
            <AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Typography>{user?.name}</Typography>
          <Typography>{user?.email}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}
