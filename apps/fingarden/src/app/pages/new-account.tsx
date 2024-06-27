'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { twJoin } from 'tailwind-merge'
import { z } from 'zod'

import { Routes } from '@/routes'

import { CoinsIcon, Spinner, UserIcon } from '@web-apps/ui'

import { useAccounts } from '@/hooks/accounts'
import { useCurrencies } from '@/hooks/currencies'

import { AccountSchema } from '@/domain'

import { Button } from '@/components/button'
import { LabeledInput } from '@/components/labeled-input'

const errorMessages = {
  nameRequired: 'Please, introduce a name for your new account',
  nameMaxLength: 'The account name must have less than 20 characters',
  invalidBalance: 'Please, introduce a valid balance for your new account',
}

const FormInputSchema = z.object({
  name: AccountSchema.shape.name.min(1, errorMessages.nameRequired).max(20, errorMessages.nameMaxLength),
  balance: z.number({ invalid_type_error: errorMessages.invalidBalance }),
  currencyCode: AccountSchema.shape.currencyCode,
})

type FormInput = z.infer<typeof FormInputSchema>

export const NewAccount = () => {
  const router = useRouter()
  const { createAccount, isLoading } = useAccounts()
  const { currencies, mainCurrency } = useCurrencies()

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  const { errors, isSubmitting, isSubmitted } = formState

  const isFormLoading = isSubmitting || (isSubmitted && isLoading)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await createAccount(data.name, data.balance, data.currencyCode)
      router.push(Routes.app.accounts.index)
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="my-4 text-center">Create account</h3>

      <div className="space-y-4">
        <div>
          <div className={twJoin('flex', 'flex-col max-md:gap-y-4', 'md:flex-row md:gap-x-4')}>
            <LabeledInput className="max-md:flex-1">
              <LabeledInput.Label htmlFor="currency-code"> </LabeledInput.Label>
              <LabeledInput.Select id="currency-code" {...register('currencyCode')} defaultValue={mainCurrency?.code}>
                {Object.values(currencies || {}).map((currency) => (
                  <LabeledInput.Option key={currency.code} value={currency.code}>
                    {currency.icon} {currency.name}
                  </LabeledInput.Option>
                ))}
              </LabeledInput.Select>
            </LabeledInput>
            <LabeledInput className="flex-1">
              <LabeledInput.Label htmlFor="name">
                <UserIcon />
              </LabeledInput.Label>
              <LabeledInput.Input id="name" autoComplete="off" placeholder="Name" {...register('name')} />
            </LabeledInput>
          </div>
          {errors.name?.message && <p className="text-error text-sm">{errors.name?.message}</p>}
        </div>

        <LabeledInput>
          <LabeledInput.Label htmlFor="balance">
            <CoinsIcon />
          </LabeledInput.Label>
          <LabeledInput.Input
            id="balance"
            placeholder="1.000"
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
