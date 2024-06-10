import { ComponentPropsWithoutRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { Tabs } from '@web-apps/ui'

import { usePreferences } from '@/hooks/preferences'

import { Currency } from '../domain/currencies'

type Props = Omit<ComponentPropsWithoutRef<typeof Tabs.List>, 'children'>

const currencyCodes: Array<Currency['code']> = ['EUR', 'USD']

export const CurrencyTabs = ({ className, ...rest }: Props) => {
  const { preferences, setMainCurrency } = usePreferences()

  const handleSelect = async (index: number) => {
    await setMainCurrency(currencyCodes[index])
  }

  const selectedIndex = useMemo(() => currencyCodes.findIndex((code) => code === preferences?.mainCurrency), [preferences])

  if (!preferences) return null

  return (
    <Tabs selectedIndex={selectedIndex} onSelect={handleSelect}>
      <Tabs.List className={twMerge('w-full before:bg-accent-muted', className)} {...rest}>
        {currencyCodes.map((code, index) => (
          <Tabs.Item key={code} index={index}>
            {code}
          </Tabs.Item>
        ))}
      </Tabs.List>
    </Tabs>
  )
}
