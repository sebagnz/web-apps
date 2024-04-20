import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import { Button as UIButton } from '@web-apps/ui'

export const Button = ({ className, ...rest }: ComponentPropsWithoutRef<typeof UIButton>) => {
  return <UIButton className={clsx('rounded-full', className)} {...rest} />
}
