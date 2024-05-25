import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'svg'>

export const ChartPieIcon = ({ className, ...rest }: Props) => (
  <svg className={twMerge('size-6', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
    />
  </svg>
)
