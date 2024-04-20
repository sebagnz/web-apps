import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'svg'>

export const ArrowLeftToBracketIcon = ({ className, ...rest }: Props) => (
  <svg className={twMerge('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
  </svg>
)

export const ArrowRightToBracketIcon = ({ className, ...rest }: Props) => (
  <svg className={twMerge('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
  </svg>
)

export const ArrowRight = ({ className, ...rest }: Props) => (
  <svg className={twMerge('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m14 0-4 4m4-4-4-4" />
  </svg>
)

export const ArrowLeft = ({ className, ...rest }: Props) => (
  <svg className={twMerge('w-[24px] h-[24px]', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4m-4 4 4 4" />
  </svg>
)
