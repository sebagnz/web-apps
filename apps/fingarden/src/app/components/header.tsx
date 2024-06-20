import { RANGE_LABELS, RangeKeySchema, useDateRange } from '@/contexts/date-range'
import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'

import { BaseHeader, CalendarIcon } from '@web-apps/ui'

import { Garden } from '@/components/garden'

import { LabeledInput } from './labeled-input'
import { Menu } from './menu'

export const Header = () => {
  const { rangeKey, setRangeKey } = useDateRange()

  const handleRangeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRangeKey(RangeKeySchema.parse(e.currentTarget.value))
  }

  return (
    <BaseHeader
      className={twMerge('py-2 px-4', 'justify-center items-center', 'bg-gradient-to-b from-accent-900 to-accent-900/80', 'shadow-base shadow-md')}
    >
      <div className="flex-1">
        <p className="hidden sm:flex items-center text-xl text-inverted">
          <span>Fin</span>
          <Garden height={16} className="invert" />
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <LabeledInput className="text-inverted border-none">
          <LabeledInput.Label className="sm:pr-0" htmlFor="period">
            <CalendarIcon className="size-5" />
          </LabeledInput.Label>
          <LabeledInput.Select className="text-center" id="period" onChange={handleRangeChange} defaultValue={rangeKey}>
            {Object.entries(RANGE_LABELS).map(([key, label]) => (
              <LabeledInput.Option key={key} value={key}>
                {label}
              </LabeledInput.Option>
            ))}
          </LabeledInput.Select>
        </LabeledInput>
      </div>

      <div className="flex-1 relative flex items-center justify-end">
        <Menu />
      </div>
    </BaseHeader>
  )
}
