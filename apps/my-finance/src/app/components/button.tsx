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
        'text-sm',
        'hover:font-medium hover:shadow-md',
        { 'bg-control-accent text-content-accent': isFill },
        { 'border border-control-accent text-control-accent-content': isOutline },
        { '': isInline },
        className,
      )}
      {...rest}
    />
  )
}
