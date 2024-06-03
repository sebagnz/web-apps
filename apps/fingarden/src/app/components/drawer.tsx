'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { Routes } from '@/routes'

import { Drawer as UIDrawer } from '@web-apps/ui'

type DrawerProps = {
  onClose?: () => void
  children: React.ReactNode
}

const duration = 100

export const Drawer = (props: DrawerProps) => {
  const router = useRouter()

  const nodeRef = useRef<HTMLDivElement | null>(null)

  const onClose = props.onClose || (() => router.push(Routes.app.accounts.index))

  return (
    <CSSTransition
      appear
      in
      nodeRef={nodeRef}
      timeout={duration}
      classNames={{
        appear: 'scale-x-0',
        appearActive: 'scale-x-110',
        appearDone: 'scale-x-100',
        enter: 'scale-x-0',
        enterActive: 'scale-x-110',
        enterDone: 'scale-x-100',
        exit: 'scale-x-100',
        exitActive: 'scale-x-0',
      }}
    >
      <UIDrawer
        ref={nodeRef}
        className="transition-all ease-[cubic-bezier(0.65,_0,_0.35,_1)] duration-100 origin-center sm:origin-right"
        onClose={onClose}
      >
        {props.children}
      </UIDrawer>
    </CSSTransition>
  )
}
