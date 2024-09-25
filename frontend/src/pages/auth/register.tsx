'use client'

import { Fieldset } from '@/components/fieldset'
import { SubmitButton } from '@/components/submit-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { useRegisterForm } from '@/hooks/use-register-form'
import { useTitle } from '@/hooks/use-title'
import { useId } from 'react'
import { Link } from 'react-router-dom'

export function Register() {
  const { form, onSubmit, isLoading } = useRegisterForm()
  const formId = useId()
  useTitle('Sign up')

  return (
    <Card className="relative">
      <LoadingOverlay visible={isLoading} />
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Sign up with your email, name and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id={formId} onSubmit={onSubmit}>
            <Fieldset disabled={isLoading}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="john@doe.com"
                        {...field}
                        className=""
                      />
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="" />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
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
            </Fieldset>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <SubmitButton form={formId} disabled={isLoading}>
          Sign up
        </SubmitButton>
      </CardFooter>
    </Card>
  )
}
