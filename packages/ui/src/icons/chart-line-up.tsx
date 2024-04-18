import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'svg'>

export const ChartLineUpIcon = ({ className, ...rest }: Props) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
  </svg>
)
