import clsx from 'clsx'
import { ComponentPropsWithoutRef, RefObject, useEffect, useState } from 'react'

type NavContainerProps = { expanded: boolean }

export const NavContainer = ({ expanded, className, ...rest }: ComponentPropsWithoutRef<'div'> & NavContainerProps) => {
  const collapseTransition = { '[clip-path:_circle(0px_at_top_right)]': !expanded }
  const expandTransition = { '[clip-path:_circle(150%_at_top_right)]': expanded }

  return (
    <div
      className={clsx(
        'fixed z-40 top-0 right-0 max-sm:bottom-0 max-sm:left-1/4',
        'sm:absolute sm:top-[calc(100%_+_10px)] sm:rounded-xl',
        'p-6 sm:p-4',
        'bg-base/50 backdrop-blur-md',
        'shadow-md shadow-base',
        'transition-[clip-path] duration-300 ease-out',
        [collapseTransition, expandTransition, className],
      )}
      {...rest}
    />
  )
}

export const Nav = ({ className, ...rest }: ComponentPropsWithoutRef<'nav'>) => {
  return <nav className={className} {...rest} />
}

export const NavGroup = ({ className, ...rest }: ComponentPropsWithoutRef<'ul'>) => {
  return <ul className={clsx('space-y-2', className)} {...rest} />
}

export const NavItem = ({ className, ...rest }: ComponentPropsWithoutRef<'li'>) => {
  return <li className={clsx('text-lg font-normal', 'rounded-md p-2', 'active:bg-accent-muted hover:bg-accent-muted', className)} {...rest} />
}

export const NavDivider = ({ className, ...rest }: ComponentPropsWithoutRef<'hr'>) => {
  return <hr className={clsx('my-2', 'h-[1px]', 'border-0', 'bg-accent shadow-sm', className)} {...rest} />
}

export const useNav = ({ ref }: { ref: RefObject<HTMLElement | null> }) => {
  const [state, setState] = useState<'EXPANDED' | 'COLLAPSED'>('COLLAPSED')

  const isExpanded = state === 'EXPANDED'

  const isCollapsed = state === 'COLLAPSED'

  const toggle = () => setState(isExpanded ? 'COLLAPSED' : 'EXPANDED')

  const close = () => setState('COLLAPSED')

  const open = () => setState('EXPANDED')

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (ref.current?.contains(target)) return
      close()
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref])

  return { state, isExpanded, isCollapsed, toggle, close, open }
}
