'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Routes } from '@/routes'

import { Spinner } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'

import { Button } from '@/components/button'
import { LabeledInput } from '@/components/labeled-input'

const errorMessages = {
  nameRequired: 'Please, introduce a name for your new account',
  nameMaxLength: 'The account name must have less than 20 characters',
  invalidBalance: 'Please, introduce a valid balance for your new account',
}

const FormInputSchema = z.object({
  name: z.string().min(1, errorMessages.nameRequired).max(20, errorMessages.nameMaxLength),
  balance: z.number({ invalid_type_error: errorMessages.invalidBalance }),
  image: z.string(),
})

type FormInput = z.infer<typeof FormInputSchema>

export default function Page() {
  const router = useRouter()
  const { createAccount, isLoading } = useAccounts()

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  const { errors, isSubmitting, isSubmitted } = formState

  const isFormLoading = isSubmitting || (isSubmitted && isLoading)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await createAccount(data.name, data.balance, data.image)
      router.push(Routes.app.accounts.index)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center text-2xl my-4">Create account</h2>

      <div className="space-y-4">
        <div>
          <div className={clsx('flex', 'flex-col max-md:gap-y-4', 'md:flex-row md:gap-x-4')}>
            <LabeledInput className="max-md:flex-1">
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
            <LabeledInput className="flex-1">
              <LabeledInput.Label htmlFor="name">Name</LabeledInput.Label>
              <LabeledInput.Input id="name" autoComplete="off" placeholder="Name" {...register('name')} />
            </LabeledInput>
          </div>
          {errors.name?.message && <p className="text-error text-sm">{errors.name?.message}</p>}
        </div>

        <LabeledInput>
          <LabeledInput.Label htmlFor="balance">Balance</LabeledInput.Label>
          <LabeledInput.Input
            id="balance"
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

      <Button variant="fill" type="submit" disabled={isFormLoading} className="mx-auto flex justify-center items-center gap-x-2">
        {isFormLoading ? <Spinner className="w-6" /> : null}
        <span>{isFormLoading ? 'Creating account' : 'Create account'}</span>
      </Button>
    </form>
  )
}
