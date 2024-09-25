import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { useNavigate } from 'react-router-dom'

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

  async function handleSubmit(values: FormValues) {
    toggleLoading(true)
    try {
      console.log(values)
      // await authenticate(values.email, values.password)
      return
      return navigate('/', { replace: true })
    } catch (error) {
      handleError(error)
    } finally {
      toggleLoading(false)
    }
  }

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(handleSubmit),
  }
}
