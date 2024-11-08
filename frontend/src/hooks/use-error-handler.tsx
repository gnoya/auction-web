import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { toast } from 'sonner'

export function useErrorHandler() {
  const handleError = useCallback(async (error: unknown) => {
    console.log('aaaaaaaaaaaaaaaa')
    console.error(error)
    if (!(error instanceof Error)) return

    let title = 'Error.'
    let message = 'Something went wrong. Please, try again.'
    if (error instanceof AxiosError) {
      if (error.request) {
        title = 'Connection error.'
        message =
          'Could not connect to the server. Please, check your internet connection.'
      }
      if (error.response) {
        title = error.response?.data.title ?? 'Unknown server error.'
        message = error.response?.data.detail ?? 'Try again later.'
      }
    } else {
      title = error.name
      message = error.message
    }
    toast.error(title, { description: message })
  }, [])

  return handleError
}
