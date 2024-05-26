'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Routes } from '@/routes'

import { Spinner } from '@web-apps/ui'

import { useAuth } from '@/hooks/auth'

import { Button } from '@/components/button'
import { LabeledInput } from '@/components/labeled-input'

import GoogleLogo from '../../../public/login/google.png'

const errorMessages = {
  usernameRequired: 'Please, introduce a username',
  passwordRequired: 'Please, introduce your password',
}

const FormInputSchema = z.object({
  username: z.string().min(1, errorMessages.usernameRequired),
  password: z.string().min(1, errorMessages.passwordRequired),
})

type FormInput = z.infer<typeof FormInputSchema>

export const Login = () => {
  const { loginWithEmail, loginWithGoogle, isLoading } = useAuth()
  const router = useRouter()
  const qs = useSearchParams()

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  const { errors, isSubmitting, isSubmitted } = formState

  const isFormLoading = isSubmitting || (isSubmitted && isLoading)

  const onLoginSuccess = () => {
    if (qs.has('origin')) router.replace(String(qs.get('origin')))
    else router.replace(Routes.app.accounts.index)
  }

  const handleLoginWithEmail: SubmitHandler<FormInput> = async ({ username, password }) => {
    try {
      await loginWithEmail(username, password)
      onLoginSuccess()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle()
      onLoginSuccess()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form className="space-y-3 max-w-[350px] mx-auto" onSubmit={handleSubmit(handleLoginWithEmail)}>
      <h2 className="my-4 text-center text-3xl">Log in</h2>

      <div className="mx-auto">
        <LabeledInput>
          <LabeledInput.Label htmlFor="username">Email</LabeledInput.Label>
          <LabeledInput.Input autoCapitalize="off" id="username" {...register('username')} />
        </LabeledInput>
        {errors.username?.message && <p className="text-error text-sm">{errors.username?.message}</p>}
      </div>

      <div className="mx-auto">
        <LabeledInput>
          <LabeledInput.Label htmlFor="password">Password</LabeledInput.Label>
          <LabeledInput.Input autoCapitalize="off" id="password" type="password" {...register('password')} />
        </LabeledInput>
        {errors.password?.message && <p className="text-error text-sm">{errors.password?.message}</p>}
      </div>

      <div className="space-y-5">
        <LoginButton type="submit" disabled={isFormLoading}>
          {isFormLoading ? <Spinner className="w-6" /> : null}
          <span>{isFormLoading ? 'Logging in' : 'Log in'}</span>
        </LoginButton>

        <Divider>
          <p className="text-xs text-content-tertiary">Or</p>
        </Divider>

        <LoginButton type="button" onClick={handleLoginWithGoogle}>
          <Image src={GoogleLogo} alt="Log in with Google" width={20} height={20} />
          <span>Log in with Google</span>
        </LoginButton>
      </div>
    </form>
  )
}

const LoginButton = (props: ComponentPropsWithoutRef<typeof Button>) => (
  <Button variant="fill" className="w-60 max-w-full mx-auto flex justify-center items-center gap-x-2" {...props} />
)

const Divider = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-x-2">
    <div className="h-[1px] border-t border-content-tertiary/20 flex-1" />
    {children}
    <div className="h-[1px] border-t border-content-tertiary/20 flex-1" />
  </div>
)
