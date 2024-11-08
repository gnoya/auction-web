import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

const buildFormSchema = () =>
  z.object({
    email: z.string().min(1, 'Email is required.'),
    password: z.string().min(1, 'Password is required.'),
  })

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

export function useLoginForm() {
  const navigate = useNavigate()
  const [isLoading, toggleLoading] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      email: 'test1@gmail.com',
      password: 'develop',
    },
    resolver: zodResolver(buildFormSchema()),
  })
  const { authenticate } = useAuth()
  const handleError = useErrorHandler()

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      toggleLoading(true)
      try {
        await authenticate(values)
        return navigate('/', { replace: true })
      } catch (error) {
        handleError(error)
      } finally {
        toggleLoading(false)
      }
    },
    [authenticate, navigate, handleError],
  )

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  }
}
