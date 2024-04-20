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

const Tabs = ({ selectedIndex, onSelect, ...props }: TabsProps) => {
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
        'gap-x-4 sm:gap-x-6',
        'px-1',
        'rounded-lg',
        'shadow-sm',
        'py-1 before:my-1',
        'before:bg-base/40',
        'before:shadow-inner',
        'before:content-[""]',
        'before:absolute',
        'before:z-0',
        'before:left-0 before:right-0 before:bottom-0 before:top-0',
        'before:duration-300',
        'before:transition-transform ease-in',
        'before:origin-left',
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
        'z-10',
        'select-none',
        'cursor-pointer',
        'rounded-lg',
        'transition-all ease-in-out',
        'px-3 py-2 sm:px-6 sm:py-3',
        'text-lg',
        'text-content-secondary',
        className,
      )}
      {...props}
    ></li>
  )
}

export const UITabs = { Tabs, TabList, Tab }
