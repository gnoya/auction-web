import { Fieldset } from '@/components/core/fieldset'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { LoadingOverlay } from '../ui/loading-overlay'
import { useId } from 'react'
import { useRegisterForm } from '@/hooks/forms/use-register-form'
import { SubmitButton } from '../core/submit-button'

export function RegisterForm() {
  const { form, onSubmit, isLoading } = useRegisterForm()
  const formId = useId()

  return (
    <Form {...form}>
      <form id={formId} onSubmit={onSubmit}>
        <Fieldset disabled={isLoading} className="relative">
          <LoadingOverlay visible={isLoading} />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoFocus {...field} label="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} label="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" label="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            to="/auth"
            className="mx-auto block w-fit text-sm font-medium underline"
          >
            I already have an account
          </Link>
          <SubmitButton
            form={formId}
            disabled={isLoading}
            className="mx-auto block"
          >
            Sign up
          </SubmitButton>
        </Fieldset>
      </form>
    </Form>
  )
}
