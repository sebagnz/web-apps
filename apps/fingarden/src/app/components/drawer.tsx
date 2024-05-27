'use client'

import { useRouter } from 'next/navigation'
import { CSSProperties, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'

import { Routes } from '@/routes'

import { Drawer as UIDrawer } from '@web-apps/ui'

type DrawerProps = {
  onClose?: () => void
  children: React.ReactNode
}

const duration = 100

const initialStyle = {
  transition: `all ${duration}ms ease-out`,
  transformOrigin: 'right',
  scale: '1 1',
}

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: { scale: '1.1' },
  entered: { scale: '1 1' },
  exiting: { scale: '0 1' },
  exited: { scale: '0 1' },
  unmounted: { scale: '0 1' },
}

export const Drawer = (props: DrawerProps) => {
  const router = useRouter()

  const nodeRef = useRef(null)

  const onClose = props.onClose || (() => router.push(Routes.app.accounts.index))

  return (
    <Transition nodeRef={nodeRef} appear in timeout={duration}>
      {(state) => (
        <UIDrawer
          onClose={onClose}
          style={{
            ...initialStyle,
            ...transitionStyles[state],
          }}
        >
          {props.children}
        </UIDrawer>
      )}
    </Transition>
  )
}
