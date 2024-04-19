import clsx from 'clsx'

import { Metamorphic } from '@web-apps/ui'

type ButtonProps = {
  variant?: 'fill' | 'outline' | 'inline'
}

export const Button: Metamorphic<'button', ButtonProps> = (props) => {
  const { as: Component = 'button', variant = 'outline', className, ...rest } = props

  const isFill = variant === 'fill'
  const isOutline = variant === 'outline'
  const isInline = variant === 'inline'

  return (
    <Component
      className={clsx(
        'py-2 px-4',
        'rounded-full',
        'transition-shadow duration-300',
        'text-sm shadow-md hover:shadow-lg',
        { 'bg-accent text-inverted': isFill },
        { 'bg-accent-muted text-accent': isOutline },
        { '': isInline },
        className,
      )}
      {...rest}
    />
  )
}
