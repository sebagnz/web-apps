'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { LabeledInput } from '@/components/forms/labeled-input'

type SavingPageProps = { className?: string }

const errorMessages = {
  dateToDateFrom: 'the "From" date cannot be later than the "To" date',
}

const FormInputSchema = z
  .object({
    dateFrom: z.date(),
    dateTo: z.date(),
    account: z.string().optional(),
  })
  .refine((formSchema) => formSchema.dateFrom < formSchema.dateTo, {
    message: errorMessages.dateToDateFrom,
    path: ['dateTo'],
  })

type FormInput = z.infer<typeof FormInputSchema>

const defaultDateTo = new Date()
const defaultDateFrom = new Date(new Date().setFullYear(defaultDateTo.getFullYear() - 1))

export default function SavingsPage({ className }: SavingPageProps) {
  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
    mode: 'onChange',
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      console.log('Submitted')
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <div className={className}>
      <form className="mt-3 flex flex-col sm:flex-row justify-between gap-x-4 gap-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between gap-x-4 gap-y-2">
          <LabeledInput className="grow">
            <LabeledInput.Label htmlFor="dateFrom">From</LabeledInput.Label>
            <LabeledInput.Input
              id="dateFrom"
              type="date"
              defaultValue={defaultDateFrom.toISOString().substring(0, 10)}
              {...register('dateFrom', { valueAsDate: true, onBlur: handleSubmit(onSubmit) })}
            />
          </LabeledInput>

          <LabeledInput className="grow">
            <LabeledInput.Label htmlFor="dateTo">To</LabeledInput.Label>
            <LabeledInput.Input
              id="dateTo"
              type="date"
              defaultValue={defaultDateTo.toISOString().substring(0, 10)}
              {...register('dateTo', { valueAsDate: true, onBlur: handleSubmit(onSubmit) })}
            />
          </LabeledInput>
        </div>

        {errors.dateTo?.message && <p className="text-error text-sm">{errors.dateTo?.message}</p>}

        <LabeledInput className="grow">
          <LabeledInput.Label htmlFor="account">Account</LabeledInput.Label>
          <LabeledInput.Select id="account" {...register('account', { onChange: handleSubmit(onSubmit) })}>
            <LabeledInput.Option value={undefined}>All</LabeledInput.Option>
            <LabeledInput.Option value="Santander">🤑 Santander</LabeledInput.Option>
            <LabeledInput.Option value="Revolut">💰 Revolut</LabeledInput.Option>
          </LabeledInput.Select>
        </LabeledInput>
      </form>
    </div>
  )
}
