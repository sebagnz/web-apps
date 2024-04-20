import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'svg'>

export const BarsIcon = ({ className, ...rest }: Props) => (
  <svg className={twMerge('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
  </svg>
)
