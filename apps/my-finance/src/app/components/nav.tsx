import clsx from 'clsx'
import Link from 'next/link'
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
        'bg-base-primary/50 backdrop-blur-md',
        'text-content-secondary',
        'shadow-xl shadow-modal-overlay',
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
  return (
    <li className={clsx('text-lg font-normal', 'rounded-md p-2', 'active:bg-control-accent/10 hover:bg-control-accent/10', className)} {...rest} />
  )
}

export const NavMenuDivider = ({ className, ...rest }: ComponentPropsWithoutRef<'hr'>) => {
  return <hr className={clsx('my-2 h-[1px]', 'border-0', 'bg-base-accent/50 shadow-sm', className)} {...rest} />
}

export const NavLink = ({ className, ...rest }: ComponentPropsWithoutRef<typeof Link>) => {
  return <Link className={clsx('flex items-center gap-x-2 text-lg font-normal', className)} {...rest} />
}

export const NavButton = ({ className, ...rest }: ComponentPropsWithoutRef<'button'>) => {
  return <button className={clsx('flex items-center gap-x-2 text-lg font-normal', className)} {...rest} />
}

export const useNavMenu = ({ ref }: { ref: RefObject<HTMLElement | null> }) => {
  const [state, setState] = useState<'EXPANDED' | 'COLLAPSED'>('COLLAPSED')

  const isMenuExpanded = state === 'EXPANDED'

  const isMenuCollapsed = state === 'COLLAPSED'

  const toggleMenu = () => setState(state === 'EXPANDED' ? 'COLLAPSED' : 'EXPANDED')

  const closeMenu = () => setState('COLLAPSED')

  const openMenu = () => setState('EXPANDED')

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current === null) return
      if (ref.current.contains(event.target as HTMLElement)) return
      closeMenu()
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref])

  return { state, isMenuExpanded, isMenuCollapsed, toggleMenu, closeMenu, openMenu }
}
