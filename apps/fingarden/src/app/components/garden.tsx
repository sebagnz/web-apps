import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'

import GargenSrc from '../../../public/garden-courgette.svg'

export const Garden = (props: Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'>) => {
  return <Image src={GargenSrc} alt="garden" {...props} />
}
