'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { LabeledInput } from '@/components/forms/labeled-input'

import { Savings } from './components/savings'

type SavingPageProps = { className?: string }

const errorMessages = {
  dateToDateFrom: 'The "From" date cannot be later than the "To" date',
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
  const { register, formState, control } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
    mode: 'onChange',
  })

  const { errors, isValid } = formState

  const dateFrom = useWatch({ control, name: 'dateFrom', defaultValue: defaultDateFrom })
  const dateTo = useWatch({ control, name: 'dateTo', defaultValue: defaultDateTo })

  return (
    <div className={className}>
      <form className="mt-3">
        <div className="flex justify-between gap-x-4 gap-y-2">
          <LabeledInput className="grow text-xs">
            <LabeledInput.Label htmlFor="dateFrom">From</LabeledInput.Label>
            <LabeledInput.Input
              id="dateFrom"
              type="month"
              min="2020-01"
              max={new Date().toISOString().substring(0, 7)}
              defaultValue={defaultDateFrom.toISOString().substring(0, 7)}
              {...register('dateFrom', { valueAsDate: true })}
            />
          </LabeledInput>

          <LabeledInput className="grow text-xs">
            <LabeledInput.Label htmlFor="dateTo">To</LabeledInput.Label>
            <LabeledInput.Input
              id="dateTo"
              type="month"
              min="2020-01"
              max={new Date().toISOString().substring(0, 7)}
              defaultValue={defaultDateTo.toISOString().substring(0, 7)}
              {...register('dateTo', { valueAsDate: true })}
            />
          </LabeledInput>
        </div>
        {errors.dateTo?.message && <p className="text-error text-sm mx-auto">{errors.dateTo?.message}</p>}
      </form>
      {isValid && <Savings dateFrom={dateFrom} dateTo={dateTo} />}
    </div>
  )
}
