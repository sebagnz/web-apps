'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAccounts } from '@/hooks/accounts'

const errorMessages = {
  nameRequired: 'Please, introduce a name for your new account',
  nameMaxLength: 'The account name must have less than 20 characters',
  invalidaValance: 'Please, introduce a valid balance for your new account',
}

const FormInputSchema = z.object({
  name: z.string().min(1, errorMessages.nameRequired).max(20, errorMessages.nameMaxLength),
  balance: z.number({ invalid_type_error: errorMessages.invalidaValance }),
  image: z.string(),
})

type FormInput = z.infer<typeof FormInputSchema>

export default function Page() {
  const { back } = useRouter()
  const { createAccount } = useAccounts()

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log('Submitting')
    await createAccount(data.name, data.balance, data.image)
    back()
  }

  return (
    <div className="bg-white">
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-x-4">
          <label className="my-2" htmlFor="name">
            Name
          </label>
          <input className="py-3 px-2 border-accent border rounded-md" id="name" placeholder="ABC Bank" {...register('name')} />
          {errors.name?.message && <p className="text-red-500">{errors.name?.message}</p>}
        </div>

        <div className="flex flex-col gap-x-4">
          <label className="my-2" htmlFor="balance">
            Balance
          </label>
          <input
            className="py-3 px-2 border-accent border rounded-md"
            id="balance"
            placeholder="100"
            autoComplete="off"
            type="number"
            inputMode="decimal"
            step="any"
            {...register('balance', { valueAsNumber: true })}
          />
          {errors.balance?.message && <p className="text-red-500">{errors.balance?.message}</p>}
        </div>

        <div className="flex flex-col gap-x-4">
          <label className="my-2" htmlFor="image">
            Image
          </label>
          <input className="py-3 px-2 border-accent border rounded-md" id="image" defaultValue="💶" {...register('image')} />
          {errors.image?.message && <p className="text-red-500">{formState.errors.image?.message}</p>}
        </div>

        <input className="border rounded-md mt-4 px-3 py-2 hover:bg-accent" type="submit" value="Create Account" />
      </form>
    </div>
  )
}
