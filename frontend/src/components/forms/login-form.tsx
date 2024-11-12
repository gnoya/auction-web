import { Fieldset } from '@/components/core/fieldset'
import { SubmitButton } from '@/components/core/submit-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { useLoginForm } from '@/hooks/forms/use-login-form'
import { useId } from 'react'
import { LoadingOverlay } from '../ui/loading-overlay'

export function LoginForm() {
  const { form, onSubmit, isLoading } = useLoginForm()
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
                  <Input
                    {...field}
                    autoFocus
                    placeholder="john@doe.com"
                    label="Email"
                  />
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
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    label="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            to="/auth/register"
            className="mx-auto block w-fit text-sm font-medium underline"
          >
            Don't have an account? Sign up now
          </Link>
          <SubmitButton
            form={formId}
            disabled={isLoading}
            className="mx-auto block"
          >
            Sign in
          </SubmitButton>
        </Fieldset>
      </form>
    </Form>
  )
}
