import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="container grid h-screen grid-cols-1 grid-rows-[auto_1fr] overflow-hidden border-x px-0 xl:grid-cols-[300px_1fr]">
      <main className="h-full overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
