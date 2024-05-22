import { ComponentPropsWithoutRef } from 'react'
import { twJoin } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'span'>

export const Highlight = ({ className, children, ...rest }: Props) => {
  return (
    <span className="inline-block">
      <span
        className={twJoin(
          'inline-block py-1 slant slant-l mx-2 border-image-conic border-outset-y-3 border-outset-x-1 from-accent to-accent text-inverted',
          className,
        )}
        {...rest}
      >
        {children}
      </span>
    </span>
  )
}
