import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from '@/guards/auth-guard'
import { AppLayout } from '@/layouts/app-layout'
import { AuthLayout } from '@/layouts/auth-layout'
import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { ListAuctions } from './pages/auction/list-auctions'
import { Dashboard } from './pages/auction/dashboard'
import { Auction } from './pages/auction/auction'
import { EditAuction } from './pages/auction/edit-auction'
import { CreateAuction } from './pages/auction/create-auction'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
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
