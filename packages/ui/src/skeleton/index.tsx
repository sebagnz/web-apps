import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Skeleton = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div role="status" className="animate-pulse" {...props}>
      <div className={twMerge('min-h-2 bg-muted/50 rounded-lg', className)} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
