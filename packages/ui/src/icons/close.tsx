import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'svg'>

export const CloseIcon = ({ className, ...rest }: Props) => (
  <svg className={twMerge('size-6', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6m0 12L6 6" />
  </svg>
)
