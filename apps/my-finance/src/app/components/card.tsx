import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card = ({ className, children }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge(
        'backdrop-blur-sm',
        'bg-accent-muted/20 backdrop-blur-sm',
        'border border-base rounded-2xl',
        'p-5',
        'transition-shadow duration-300',
        'shadow-sm shadow-base/20 hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  )
}
