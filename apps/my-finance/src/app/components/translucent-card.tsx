import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

export const TranslucentCard = ({ className, children }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={clsx(
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
