'use client'

import { useRouter } from 'next/navigation'
import { CSSProperties, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'

import { Modal as UIModal } from '@web-apps/ui'

type ModalProps = {
  onClickOutside?: () => void
  onClose?: () => void
  children: React.ReactNode
}

const duration = 170

const initialStyle = {
  transition: `all ${duration}ms ease-out`,
  transformOrigin: 'top left',
  scale: 1,
  opacity: 1,
}

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: { scale: 1.1, opacity: 1 },
  entered: { scale: 1, opacity: 1 },
  exiting: { scale: 0, opacity: 0 },
  exited: { scale: 0, opacity: 0 },
  unmounted: { scale: 0, opacity: 0 },
}

export const Modal = (props: ModalProps) => {
  const router = useRouter()

  const nodeRef = useRef(null)

  const goBackOrGoHome = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const onClickOutside = props.onClickOutside || goBackOrGoHome
  const onClose = props.onClose || goBackOrGoHome

  return (
    <Transition nodeRef={nodeRef} appear in timeout={duration}>
      {(state) => (
        <UIModal.Overlay onClick={onClickOutside}>
          <UIModal.Body
            ref={nodeRef}
            onClose={onClose}
            style={{
              ...initialStyle,
              ...transitionStyles[state],
            }}
          >
            {props.children}
          </UIModal.Body>
        </UIModal.Overlay>
      )}
    </Transition>
  )
}
