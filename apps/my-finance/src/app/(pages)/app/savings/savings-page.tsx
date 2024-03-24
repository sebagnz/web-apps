'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { LabeledInput } from '@/components/forms/labeled-input'

type SavingPageProps = { className?: string }

const errorMessages = { dateRequired: 'Please, introduce a valid date' }

const FormInputSchema = z.object({
  dateFrom: z.date({ required_error: errorMessages.dateRequired }),
  dateTo: z.date({ required_error: errorMessages.dateRequired }),
  account: z.string().optional(),
})

type FormInput = z.infer<typeof FormInputSchema>

const defaultDateTo = new Date()
const defaultDateFrom = new Date(new Date().setFullYear(defaultDateTo.getFullYear() - 1))

export default function SavingsPage({ className }: SavingPageProps) {
  const { register } = useForm<FormInput>({
    resolver: zodResolver(FormInputSchema),
  })

  return (
    <div className={className}>
      <div className="mt-3 flex flex-col sm:flex-row justify-between gap-x-4 gap-y-2">
        <div className="flex justify-between gap-x-4 gap-y-2">
          <LabeledInput className="grow">
            <LabeledInput.Label htmlFor="dateFrom">From</LabeledInput.Label>
            <LabeledInput.Input
              id="dateFrom"
              type="date"
              defaultValue={defaultDateFrom.toISOString().substring(0, 10)}
              {...register('dateFrom', { valueAsDate: true })}
            />
          </LabeledInput>

          <LabeledInput className="grow">
            <LabeledInput.Label htmlFor="dateTo">To</LabeledInput.Label>
            <LabeledInput.Input
              id="dateTo"
              type="date"
              defaultValue={defaultDateTo.toISOString().substring(0, 10)}
              {...register('dateTo', { valueAsDate: true })}
            />
          </LabeledInput>
        </div>

        <LabeledInput className="grow">
          <LabeledInput.Label htmlFor="account">Account</LabeledInput.Label>
          <LabeledInput.Select id="account" {...register('account')}>
            <LabeledInput.Option value={undefined}>All</LabeledInput.Option>
            <LabeledInput.Option value="Santander">Santander</LabeledInput.Option>
            <LabeledInput.Option value="Revolut">Revolut</LabeledInput.Option>
          </LabeledInput.Select>
        </LabeledInput>
      </div>
    </div>
  )
}
