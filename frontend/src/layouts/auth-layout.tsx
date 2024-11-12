import { ThemeToggler } from '@/components/core/theme-toggler'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="relative grid min-h-screen w-full place-items-center px-8">
      <ThemeToggler className="absolute right-8 top-8" />
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
