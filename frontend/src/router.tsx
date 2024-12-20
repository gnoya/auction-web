import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthGuard } from '@/guards/auth-guard'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { ListAuctions } from '@/pages/dashboard/list-auctions'
import { Auction } from '@/pages/dashboard/auction'
import { EditAuction } from '@/pages/dashboard/edit-auction'
import { CreateAuction } from '@/pages/dashboard/create-auction'
import { Profile } from './pages/dashboard/profile'
import { MyAuctions } from './pages/dashboard/my-auctions'

export const router = createBrowserRouter([
  {
    path: '',
    element: <Navigate to="/dashboard/auctions" replace />,
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'auctions',
        children: [
          {
            path: '',
            element: <ListAuctions />,
          },
          {
            path: 'create',
            element: <CreateAuction />,
          },
          {
            path: 'mine',
            element: <MyAuctions />,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                element: <Auction />,
              },
              {
                path: 'edit',
                element: <EditAuction />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])
