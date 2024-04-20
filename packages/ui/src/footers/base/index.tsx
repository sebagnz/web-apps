import type { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export const BaseFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <footer className={twMerge('flex', className)} {...props}>
      {children}
    </footer>
  )
}
