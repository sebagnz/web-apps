'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAccounts } from '@/hooks/accounts'

import { LabeledInput } from '@/components/forms/LabeledInput'

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
    await createAccount(data.name, data.balance, data.image)
    back()
  }

  return (
    <form className="flex flex-col justify-between gap-y-3" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-3xl my-4">Create account</h2>
      <div>
        <div className="flex gap-x-4">
          <div>
            <LabeledInput>
              <LabeledInput.Label htmlFor="image">Image</LabeledInput.Label>
              <LabeledInput.Select id="image" {...register('image')}>
                <LabeledInput.Option value="💶">💶</LabeledInput.Option>
                <LabeledInput.Option value="💵">💵</LabeledInput.Option>
                <LabeledInput.Option value="💸">💸</LabeledInput.Option>
                <LabeledInput.Option value="💰">💰</LabeledInput.Option>
                <LabeledInput.Option value="🤑">🤑</LabeledInput.Option>
                <LabeledInput.Option value="💳">💳</LabeledInput.Option>
                <LabeledInput.Option value="💲">💲</LabeledInput.Option>
                <LabeledInput.Option value="🪙">🪙</LabeledInput.Option>
              </LabeledInput.Select>
            </LabeledInput>
          </div>
          <div className="w-full">
            <LabeledInput>
              <LabeledInput.Label htmlFor="name">Name</LabeledInput.Label>
              <LabeledInput.Text id="name" autoComplete="off" placeholder="Name" {...register('name')} />
            </LabeledInput>
          </div>
        </div>
        {errors.name?.message && <p className="text-error text-sm">{errors.name?.message}</p>}
      </div>

      <div>
        <LabeledInput>
          <LabeledInput.Label htmlFor="balance">Balance</LabeledInput.Label>
          <LabeledInput.Text
            id="balance"
            className="text-3xl text-center"
            placeholder="100"
            autoComplete="off"
            type="number"
            inputMode="decimal"
            step="any"
            {...register('balance', { valueAsNumber: true })}
          />
        </LabeledInput>
        {errors.balance?.message && <p className="text-error text-sm">{errors.balance?.message}</p>}
      </div>

      <input type="submit" value="Create Account" className="fi-control rounded-md mt-4 mx-auto px-3 py-2" />
    </form>
  )
}
