import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Toaster } from './components/ui/sonner'
import AuthProvider from './providers/auth-provider'
import { ThemeProvider } from './providers/theme-provider'
import { TitleProvider } from './providers/title-provider'
import { router } from './router'

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TitleProvider>
          <RouterProvider router={router} />
        </TitleProvider>
      </ThemeProvider>
      <Toaster position="bottom-center" />
    </AuthProvider>
  )
}
