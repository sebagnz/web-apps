'use client'

import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Skeleton } from '@web-apps/ui'

import { usePreferences } from '@/hooks/preferences'

import { CurrencyTabs } from '@/components/currency-tabs'
import { HideBalancesSwitch } from '@/components/hide-balance-switch'

export const Preferences = () => {
  const { preferences, isLoading } = usePreferences()

  if (!preferences && isLoading) return <Loading className="space-y-8 pt-4" />

  return (
    <div className="space-y-8 pt-4">
      <h3 className="text-center">Preferences</h3>

      <div className="grid grid-cols-2 gap-y-1 items-center">
        <Divider />

        <PreferenceKey>Main currency</PreferenceKey>
        <CurrencyTabs />

        <Divider />

        <PreferenceKey>Hide balances</PreferenceKey>
        <HideBalancesSwitch />

        <Divider />
      </div>
    </div>
  )
}

const PreferenceKey = ({ className, ...rest }: ComponentPropsWithoutRef<'p'>) => <p className={twMerge('py-2 w-max', className)} {...rest} />

const Divider = () => <div className="col-span-full border-t border-base" />

const Loading = (props: ComponentPropsWithoutRef<'div'>) => (
  <div {...props}>
    <div className="flex flex-col items-center content-center gap-y-2">
      <Skeleton className="h-10 w-48" />
    </div>

    <div className="grid grid-cols-2 gap-x-2 gap-y-4 items-center">
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
      <Skeleton className="h-10 w-40" />
    </div>
  </div>
)
