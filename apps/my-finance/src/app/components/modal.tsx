'use client'

import clsx from 'clsx'
import { CSSProperties, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'

import { CloseIcon } from '@web-apps/ui'

type ModalProps = {
  show: boolean
  className?: string
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

export const Modal = ({ show, className, onClickOutside, onClose, children }: ModalProps) => {
  const nodeRef = useRef(null)

  const closeButton = onClose ? (
    <button className="absolute right-3 top-3" aria-label="Close" onClick={onClose}>
      <CloseIcon className="hover:stroke-2" />
    </button>
  ) : null

  return (
    <Transition nodeRef={nodeRef} in={show} timeout={duration} unmountOnExit>
      {(state) => (
        <div className="absolute inset-0 bg-inverted/30 backdrop-blur-sm" onClick={onClickOutside}>
          <div
            ref={nodeRef}
            style={{
              ...initialStyle,
              ...transitionStyles[state],
            }}
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              'bg-base/80',
              'inline-block',
              'relative',
              'top-[150px] md:top-[250px] left-1/2',
              '-translate-x-1/2',
              'max-md:min-w-[90vw] max-xl:min-w-[50vw] min-w-[35vw] max-w-[90vw]',
              'min-h-[400px] max-h-[90vh]',
              'p-6',
              'rounded-md',
              'shadow-2xl',
              className,
            )}
          >
            {closeButton}
            {children}
          </div>
        </div>
      )}
    </Transition>
  )
}
