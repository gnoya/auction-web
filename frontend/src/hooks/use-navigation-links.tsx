import { CircleDollarSign, Landmark, User as UserIcon } from 'lucide-react'
export function useNavigationLinks() {
  const links = [
    {
      href: '/dashboard/auctions',
      icon: <Landmark size={24} />,
      label: 'Auctions',
    },
    {
      href: '/dashboard/auctions/mine',
      icon: <Landmark size={24} />,
      label: 'My auctions',
    },
    {
      href: '/dashboard/auctions/create',
      icon: <CircleDollarSign size={24} />,
      label: 'Create auction',
    },

    {
      href: '/dashboard/profile',
      icon: <UserIcon size={24} />,
      label: 'Profile',
    },
  ]

  return links
}
