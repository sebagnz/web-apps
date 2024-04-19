import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

export const Skeleton = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div role="status" className="animate-pulse" {...props}>
      <div className={clsx('min-h-2 bg-muted/50 rounded-lg', className)} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
