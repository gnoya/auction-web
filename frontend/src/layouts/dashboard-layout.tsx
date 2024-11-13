import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { useTitle } from '@/hooks/core/use-title'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { title } = useTitle()

  return (
    <div className="mx-auto grid h-screen max-w-screen-xl grid-cols-1 overflow-hidden border-x md:grid-cols-[280px_auto]">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <div className="grid h-screen grid-rows-[90px_auto] content-start overflow-hidden">
        <Header
          title={title}
          onSidebarButtonClick={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="h-full w-full overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
