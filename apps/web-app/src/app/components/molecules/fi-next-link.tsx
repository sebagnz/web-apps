import Link from 'next/link'
import { ComponentPropsWithRef } from 'react'

import { FILink } from '@my-finance/ui'

export const FINextLink = (props: ComponentPropsWithRef<typeof FILink>) => <FILink as={Link} {...props} />
