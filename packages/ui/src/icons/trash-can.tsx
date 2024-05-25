import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'svg'>

export const TrashCanIcon = ({ className, ...rest }: Props) => (
  <svg className={twMerge('size-6', 'stroke-1', className)} fill="none" viewBox="0 0 24 24" {...rest}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
    />
  </svg>
)
