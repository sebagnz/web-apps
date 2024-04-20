import type { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export const BaseHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <header className={twMerge(className, 'flex')} {...props}>
      {children}
    </header>
  )
}
