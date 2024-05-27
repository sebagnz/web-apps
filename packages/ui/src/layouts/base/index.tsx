import { Children, ComponentPropsWithoutRef, type ReactNode, cloneElement, isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'

function Header({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return <div className={twMerge('col-span-5', className)} {...rest} />
}

function LeftAside({ className, ...rest }: ComponentPropsWithoutRef<'aside'>) {
  return <aside className={twMerge('hidden lg:block col-span-1', className)} {...rest} />
}

function Main({ className, ...rest }: ComponentPropsWithoutRef<'main'>) {
  return <main className={twMerge('col-span-5', className)} {...rest} />
}

function RightAside({ className, ...rest }: ComponentPropsWithoutRef<'aside'>) {
  return <aside className={twMerge('hidden md:block col-span-1', className)} {...rest} />
}

function Footer({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return <div className={twMerge('col-span-5', className)} {...rest} />
}

const findChildrenByType = (children: ReactNode | Array<ReactNode>, type: any) => {
  return Children.toArray(children).find((child) => isValidElement(child) && child.type === type)
}

export function BaseLayout({ className, children }: { className?: string; children: ReactNode }) {
  const header = findChildrenByType(children, Header)
  const leftAside = findChildrenByType(children, LeftAside)
  const main = findChildrenByType(children, Main)
  const rightAside = findChildrenByType(children, RightAside)
  const footer = findChildrenByType(children, Footer)

  let mainSpan
  if (rightAside && leftAside) mainSpan = 'md:col-span-4 lg:col-span-3'
  if (!rightAside && !leftAside) mainSpan = 'md:col-span-5 lg:col-span-5'
  if (!leftAside && rightAside) mainSpan = 'md:col-span-4 lg:col-span-4'
  if (leftAside && !rightAside) mainSpan = 'md:col-span-5 lg:col-span-4'

  const mainWithClassNames = isValidElement(main)
    ? cloneElement(main, { className: twMerge(main.props.className, mainSpan) } as ComponentPropsWithoutRef<typeof Main>)
    : main

  return (
    <div className={twMerge('grid grid-cols-5 grid-rows-[auto_1fr_auto] min-h-[100svh]', className)}>
      {header}
      {leftAside}
      {mainWithClassNames}
      {rightAside}
      {footer}
    </div>
  )
}

BaseLayout.Header = Header
BaseLayout.LeftAside = LeftAside
BaseLayout.Main = Main
BaseLayout.RightAside = RightAside
BaseLayout.Footer = Footer
