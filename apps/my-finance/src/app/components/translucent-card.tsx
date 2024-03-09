import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

export const TranslucentCard = ({ className, children }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={clsx(
        'backdrop-blur-sm',
        'bg-gradient-to-br from-content-base/90 to-content-base/50',
        'text-content-secondary',
        'rounded-3xl',
        'p-5',
        'transition-shadow duration-300',
        'shadow-md hover:shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}
