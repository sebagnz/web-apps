import type { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

export const BaseHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <header className={clsx(className, 'flex')} {...props}>
      {children}
    </header>
  )
}
