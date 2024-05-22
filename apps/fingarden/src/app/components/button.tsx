import { ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Metamorphic, Button as UIButton } from '@web-apps/ui'

export const Button: Metamorphic<typeof UIButton, ComponentPropsWithoutRef<typeof UIButton>> = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof UIButton>) => {
  return <UIButton className={twMerge('rounded-full', className)} {...rest} />
}
