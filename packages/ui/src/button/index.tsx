import { twMerge } from 'tailwind-merge'

import { Metamorphic } from '../metamorphic'

type ButtonProps = {
  variant?: 'fill' | 'outline'
}

export const Button: Metamorphic<'button', ButtonProps> = (props) => {
  const { as: Component = 'button', variant = 'outline', className, ...rest } = props

  const isFill = variant === 'fill'
  const isOutline = variant === 'outline'

  return (
    <Component
      className={twMerge(
        'py-2 px-4',
        'rounded-md',
        'text-sm shadow-md hover:shadow-lg',
        'transition-shadow duration-300',
        isFill && 'bg-accent text-inverted',
        isOutline && 'bg-accent-muted text-accent',
        className,
      )}
      {...rest}
    />
  )
}
