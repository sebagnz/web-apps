import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

export const TranslucentCard = ({ className, children }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={clsx(
        'backdrop-blur-sm',
        'bg-purple-50/50 backdrop-blur-sm',
        'border border-purple-300/10',
        'text-content-secondary',
        'rounded-2xl',
        'p-5',
        'transition-shadow duration-300',
        'shadow-sm hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  )
}
