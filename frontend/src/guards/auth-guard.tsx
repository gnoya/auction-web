import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'

interface AuthGuardProps {
  children?: ReactNode
}
export function AuthGuard({ children }: AuthGuardProps) {
  const { authenticated } = useAuth()
  console.log(authenticated)

  if (!authenticated) return <Navigate to="/auth" replace />

  return children ? children : <Outlet />
}
