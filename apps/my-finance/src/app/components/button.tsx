import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import { Metamorphic, Button as UIButton } from '@web-apps/ui'

export const Button: Metamorphic<typeof UIButton, ComponentPropsWithoutRef<typeof UIButton>> = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof UIButton>) => {
  return <UIButton className={clsx('rounded-full', className)} {...rest} />
}
