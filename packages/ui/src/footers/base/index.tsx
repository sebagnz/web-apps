import clsx from 'clsx'
import type { FC, HTMLAttributes } from 'react'

export const BaseFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <footer className={clsx(className, 'flex')} {...props}>
      {children}
    </footer>
  )
}
