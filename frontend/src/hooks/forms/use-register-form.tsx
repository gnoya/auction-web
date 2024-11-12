import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useErrorHandler } from '@/hooks/core/use-error-handler'
import { useNavigate } from 'react-router-dom'
import { register } from '@/api/auth'
import { toast } from 'sonner'

const buildFormSchema = () =>
  z.object({
    email: z.string().email().min(1, 'Email is required.'),
    name: z.string().min(1, 'Name is required.'),
    password: z.string().min(1, 'Password is required.'),
  })

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

export function useRegisterForm() {
  const navigate = useNavigate()
  const [isLoading, toggleLoading] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    resolver: zodResolver(buildFormSchema()),
  })
  const handleError = useErrorHandler()

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      toggleLoading(true)

      try {
        await register(values)
        toast.success('Account created successfully')
        return navigate('/auth', { replace: true })
      } catch (error) {
        handleError(error)
      } finally {
        toggleLoading(false)
      }
    },
    [navigate, handleError],
  )

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  }
}
