import clsx from 'clsx'
import type { FC, HTMLAttributes } from 'react'

export const BaseHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <header className={clsx(className, 'flex')} {...props}>
      {children}
    </header>
  )
}
