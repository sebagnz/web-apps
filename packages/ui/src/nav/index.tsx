'use client'

import { ComponentPropsWithoutRef, RefObject, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type NavContainerProps = { expanded: boolean }

const NavContainer = ({ expanded, className, ...rest }: ComponentPropsWithoutRef<'div'> & NavContainerProps) => (
  <div
    className={twMerge(
      'fixed z-40 top-0 right-0 max-sm:bottom-0 max-sm:left-1/4',
      'sm:absolute sm:top-[calc(100%_+_10px)] sm:rounded-xl',
      'p-6 sm:p-4',
      'bg-base/50 backdrop-blur-md',
      'shadow-md shadow-base',
      'transition-[clip-path] duration-300 ease-out',
      expanded ? '[clip-path:_circle(150%_at_top_right)]' : '[clip-path:_circle(0px_at_top_right)]',
      className,
    )}
    {...rest}
  />
)

const Nav = ({ className, ...rest }: ComponentPropsWithoutRef<'nav'>) => {
  return <nav className={className} {...rest} />
}

const NavGroup = ({ className, ...rest }: ComponentPropsWithoutRef<'ul'>) => {
  return <ul className={twMerge('space-y-2', className)} {...rest} />
}

const NavItem = ({ className, ...rest }: ComponentPropsWithoutRef<'li'>) => {
  return (
    <li className={twMerge('text-lg font-normal leading-3', 'rounded-md p-2', 'active:bg-accent-muted hover:bg-accent-muted', className)} {...rest} />
  )
}

const NavDivider = ({ className, ...rest }: ComponentPropsWithoutRef<'hr'>) => {
  return <hr className={twMerge('my-2', 'h-[1px]', 'border-0', 'bg-accent', className)} {...rest} />
}

const useNav = ({ ref }: { ref: RefObject<HTMLElement | null> }) => {
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

export const UINav = { NavContainer, Nav, NavGroup, NavItem, NavDivider, useNav }
