import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  variant: 'landing' | 'app'
  className?: string
  children?: ReactNode
}

export const Page = ({ variant, className, children }: Props) => {
  const landingClassName = 'mx-auto px-4 max-w-3xl py-14'
  const appClassNames = 'mx-auto px-4 max-w-5xl'

  return <div className={twMerge([variant === 'app' && appClassNames, variant === 'landing' && landingClassName], className)}>{children}</div>
}
