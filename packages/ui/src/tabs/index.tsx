'use client'

import { ReactNode, createContext, useContext, useLayoutEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

const TabsContext = createContext<{
  selectedIndex: number
  onSelect: (index: number) => void
  containerRef: React.RefObject<HTMLUListElement>
  selectedTabRef: React.RefObject<HTMLLIElement>
}>({
  selectedIndex: 0,
  onSelect: () => {},
  containerRef: { current: null },
  selectedTabRef: { current: null },
})

const useTabs = () => useContext(TabsContext)

type TabsProps = {
  selectedIndex: number
  onSelect: (index: number) => void
  children: ReactNode
}

export function Tabs({ selectedIndex, onSelect, ...props }: TabsProps) {
  const containerRef = useRef<HTMLUListElement | null>(null)
  const selectedTabRef = useRef<HTMLLIElement | null>(null)

  return <TabsContext.Provider value={{ selectedIndex, onSelect, containerRef, selectedTabRef }} {...props} />
}

type TabListProps = {
  className?: string
  children: ReactNode
}

const TabList = ({ className, ...props }: TabListProps) => {
  const { containerRef, selectedTabRef } = useTabs()

  useLayoutEffect(() => {
    if (containerRef.current && selectedTabRef.current) {
      const newTabWidth = selectedTabRef.current.offsetWidth / containerRef.current.offsetWidth
      const newTabLeft = selectedTabRef.current.offsetLeft
      containerRef.current.style.setProperty('--width', `${newTabWidth}`)
      containerRef.current.style.setProperty('--left', `${newTabLeft}px`)
      containerRef.current.style.setProperty('--radius', '0.4rem')
    }
  })

  return (
    <ul
      ref={containerRef}
      role="tablist"
      className={twMerge(
        'isolate',
        'w-fit',
        'list-none',
        'relative flex justify-between',
        'p-1 gap-x-4 sm:gap-x-6',
        'rounded-lg',
        'before:my-1',
        'before:bg-accent-muted/50',
        'before:shadow-inner',
        'before:absolute before:content-[""]',
        'before:z-0 before:left-0 before:right-0 before:bottom-0 before:top-0',
        'before:transition-transform before:duration-300 before:origin-left ease-in',
        'before:scale-x-[var(--width,_0)]',
        'before:translate-x-[var(--left,_50%)]',
        'before:rounded-[calc(var(--radius,_0)/var(--width,_0))_/_var(--radius,_0)]',
        className,
      )}
      {...props}
    />
  )
}

type TabProps = {
  index: number
  className?: string
  children: ReactNode
}

const Tab = ({ index, className, ...props }: TabProps) => {
  const { selectedIndex, onSelect, selectedTabRef } = useTabs()

  return (
    <li
      role="tab"
      aria-selected={selectedIndex === index}
      ref={selectedIndex === index ? selectedTabRef : null}
      onClick={() => onSelect(index)}
      className={twMerge(
        'flex-1',
        'z-10',
        'select-none',
        'cursor-pointer',
        'rounded-lg',
        'transition-all ease-in-out',
        'px-2 py-1 sm:px-3 sm:py-1',
        'text-center',
        className,
      )}
      {...props}
    ></li>
  )
}

Tabs.List = TabList
Tabs.Item = Tab
