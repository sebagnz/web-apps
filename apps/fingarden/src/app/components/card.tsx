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
        'bg-base',
        'sm:hover:shadow-base sm:hover:shadow-sm',
        className,
      )}
      {...rest}
    />
  )
}
