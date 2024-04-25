import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge(
        'bg-accent-muted/20',
        'border border-base rounded-2xl',
        'p-5',
        'transition-shadow duration-300',
        'shadow-sm shadow-base/20 hover:shadow-md',
        className,
      )}
      {...rest}
    />
  )
}

export const BlurryCard = ({ className, ...rest }: ComponentPropsWithoutRef<typeof Card>) => {
  return <Card className={twMerge('backdrop-blur-sm', className)} {...rest} />
}
