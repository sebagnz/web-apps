import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'svg'>

export const CloseIcon = ({ className, ...rest }: Props) => (
  <svg className={clsx('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6m0 12L6 6" />
  </svg>
)
