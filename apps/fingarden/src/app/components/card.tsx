import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = ComponentPropsWithoutRef<'div'>

export const Card = ({ className, ...rest }: CardProps) => {
  return (
    <div
      className={twMerge(
        'p-6',
        'rounded-xl',
        'cursor-pointer',
        'transition-all ',
        'border border-accent/10',
        'hover:bg-gradient-to-b',
        'shadow-base/10 shadow-sm',
        className,
      )}
      {...rest}
    />
  )
}
