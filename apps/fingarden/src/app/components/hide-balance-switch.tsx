import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Switch } from '@web-apps/ui'

import { usePreferences } from '@/hooks/preferences'

type HideBalancesSwitchProps = Omit<ComponentPropsWithoutRef<typeof Switch>, 'on' | 'onChange' | 'children'>

export const HideBalancesSwitch = ({ className, ...rest }: HideBalancesSwitchProps) => {
  const { preferences, setHideBalances } = usePreferences()

  if (!preferences) return null

  return (
    <div className="flex items-center gap-x-2">
      <Switch id="toggle-balance" className={twMerge('w-12', className)} on={preferences.hideBalances} onChange={setHideBalances} {...rest} />
      <label htmlFor="toggle-balance" className="cursor-pointer">
        Hide balances
      </label>
    </div>
  )
}
