import { FILink } from '@web-apps/ui'
import Link from 'next/link'
import { ComponentPropsWithRef } from 'react'

export const FINextLink = (props: ComponentPropsWithRef<typeof FILink>) => <FILink as={Link} {...props} />
