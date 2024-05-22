'use client'

import { CSSProperties, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'

import { Modal as UIModal } from '@web-apps/ui'

type ModalProps = {
  show: boolean
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

export const Modal = ({ show, onClickOutside, onClose, children }: ModalProps) => {
  const nodeRef = useRef(null)

  return (
    <Transition nodeRef={nodeRef} in={show} timeout={duration} unmountOnExit>
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
            {children}
          </UIModal.Body>
        </UIModal.Overlay>
      )}
    </Transition>
  )
}
