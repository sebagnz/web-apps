'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAccounts } from '@/hooks/accounts'

import { LabeledSelect } from '@/components/LabeledSelect'
import { LabeledTextInput } from '@/components/LabeledTextInput'

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
            <LabeledSelect label="Image" {...register('image')}>
              <option value="💶">💶</option>
              <option value="💵">💵</option>
              <option value="💸">💸</option>
              <option value="💰">💰</option>
              <option value="🤑">🤑</option>
              <option value="💳">💳</option>
              <option value="💲">💲</option>
              <option value="🪙">🪙</option>
            </LabeledSelect>
          </div>
          <div className="w-full">
            <LabeledTextInput label="Name" autoComplete="off" id="name" placeholder="Name" {...register('name')} />
          </div>
        </div>
        {errors.name?.message && <p className="text-error text-sm">{errors.name?.message}</p>}
      </div>

      <div>
        <LabeledTextInput
          label="Balance"
          className="text-3xl text-center"
          id="balance"
          placeholder="100"
          autoComplete="off"
          type="number"
          inputMode="decimal"
          step="any"
          {...register('balance', { valueAsNumber: true })}
        />
        {errors.balance?.message && <p className="text-error text-sm">{errors.balance?.message}</p>}
      </div>

      <input type="submit" value="Create Account" className="fi-control rounded-md mt-4 mx-auto px-3 py-2" />
    </form>
  )
}
