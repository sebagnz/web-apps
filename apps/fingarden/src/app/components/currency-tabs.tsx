import { ComponentPropsWithoutRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { Tabs } from '@web-apps/ui'

import { useCurrencies } from '@/hooks/currencies'
import { usePreferences } from '@/hooks/preferences'

type Props = Omit<ComponentPropsWithoutRef<typeof Tabs.List>, 'children'>

export const CurrencyTabs = ({ className, ...rest }: Props) => {
  const { setMainCurrency } = usePreferences()
  const { mainCurrency, currencyCodes } = useCurrencies()

  const handleSelect = async (index: number) => {
    await setMainCurrency(currencyCodes[index])
  }

  const selectedIndex = useMemo(() => currencyCodes.findIndex((code) => code === mainCurrency), [mainCurrency, currencyCodes])

  if (!currencyCodes || !mainCurrency) return null

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
