import type { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'

export const BaseFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <footer className={clsx('px-4 py-2', className)} {...props}>
      {children}
    </footer>
  )
}
