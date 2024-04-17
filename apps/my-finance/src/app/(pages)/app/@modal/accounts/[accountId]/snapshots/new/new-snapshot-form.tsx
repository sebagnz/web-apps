'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Routes } from '@/routes'

import { Spinner } from '@web-apps/ui'

import { useSnapshots } from '@/hooks/snapshots'

import { Button } from '@/components/button'
import { LabeledInput } from '@/components/labeled-input'

const errorMessages = {
  dateRequired: 'Please, introduce a date for your new snapshot',
  invalidBalance: 'Please, introduce a valid balance for your new account',
}

const FormInputSchema = z.object({
  date: z.date({ required_error: errorMessages.dateRequired }),
  balance: z.number({ invalid_type_error: errorMessages.invalidBalance }),
})

type FormInput = z.infer<typeof FormInputSchema>

type NewSnapshotPageProps = { accountId: string }

export default function NewSnapshotPage({ accountId }: NewSnapshotPageProps) {
  const router = useRouter()
  const { createSnapshot, isLoading } = useSnapshots([accountId])

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  const { errors, isSubmitting, isSubmitted } = formState

  const isFormLoading = isSubmitting || (isSubmitted && isLoading)

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await createSnapshot(accountId, data.balance, data.date)
      router.push(Routes.app.accounts.id(accountId))
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="my-4 text-center text-2xl">Create snapshot</h2>

      <div>
        <LabeledInput>
          <LabeledInput.Label htmlFor="date">Date</LabeledInput.Label>
          <LabeledInput.Input
            id="date"
            type="date"
            defaultValue={new Date().toISOString().substring(0, 10)}
            {...register('date', { valueAsDate: true })}
          />
        </LabeledInput>
        {errors.date?.message && <p className="text-error text-sm">{errors.date?.message}</p>}
      </div>

      <div className="space-y-2">
        <LabeledInput>
          <LabeledInput.Label htmlFor="balance">Balance</LabeledInput.Label>
          <LabeledInput.Input
            id="balance"
            className="text-3xl"
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
        <span>{isFormLoading ? 'Creating snapshot' : 'Create snapshot'}</span>
      </Button>
    </form>
  )
}
