'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useAuth } from '@/hooks/auth'

import { LabeledInput } from '@/components/forms/LabeledInput'

const errorMessages = {
  usernameRequired: 'Please, introduce a username',
  passwordRequired: 'Please, introduce your password',
}

const FormInputSchema = z.object({
  username: z.string().min(1, errorMessages.usernameRequired),
  password: z.string().min(1, errorMessages.passwordRequired),
})

type FormInput = z.infer<typeof FormInputSchema>

export default function Page() {
  const { login } = useAuth()
  const router = useRouter()
  const qs = useSearchParams()

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<FormInput> = async ({ username, password }) => {
    try {
      await login(username, password)
      if (qs.has('origin')) router.replace(String(qs.get('origin')))
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form className="flex flex-col justify-between gap-y-3" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-3xl my-4">Log in</h2>
      <div>
        <LabeledInput>
          <LabeledInput.Label htmlFor="username">Username</LabeledInput.Label>
          <LabeledInput.Text id="username" {...register('username')} />
        </LabeledInput>
        {errors.username?.message && <p className="text-error text-sm">{errors.username?.message}</p>}
      </div>
      <div>
        <LabeledInput>
          <LabeledInput.Label htmlFor="password">Password</LabeledInput.Label>
          <LabeledInput.Text id="password" type="password" {...register('password')} />
        </LabeledInput>
        {errors.password?.message && <p className="text-error text-sm">{errors.password?.message}</p>}
      </div>
      <input type="submit" value="Sign in" className="fi-control rounded-md mt-4 mx-auto px-3 py-2" />
    </form>
  )
}
