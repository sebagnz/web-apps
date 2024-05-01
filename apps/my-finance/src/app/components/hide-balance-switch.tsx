import { ComponentPropsWithoutRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Switch } from '@web-apps/ui'

type HideBalancesSwitchProps = Omit<ComponentPropsWithoutRef<typeof Switch>, 'on' | 'onChange' | 'children'>

export const HideBalancesSwitch = ({ className, ...rest }: HideBalancesSwitchProps) => {
  const [hideBalances, setHideBalances] = useState(false)

  return (
    <div className="flex items-center gap-x-2">
      <Switch className={twMerge('w-12', className)} on={hideBalances} onChange={setHideBalances} {...rest} />
      Hide balances
    </div>
  )
}
