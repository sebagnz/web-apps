import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ComponentPropsWithRef, SyntheticEvent } from 'react'

const isString = (value: unknown): value is string => typeof value === 'string'

const safeViewTransition = (callback: () => any) => {
  if (!document.startViewTransition) return callback()
  return document.startViewTransition(callback)
}

export const TransitionLink = (props: ComponentPropsWithRef<typeof Link>) => {
  const { href, as, replace } = props

  const router = useRouter()

  const handleClick = (event: SyntheticEvent<HTMLAnchorElement>) => {
    if (href && !isString(href)) return
    if (as && !isString(as)) return

    event.preventDefault()

    safeViewTransition(() => {
      router[replace ? 'replace' : 'push'](as || href)
    })
  }

  return <Link {...props} onClick={handleClick} />
}
