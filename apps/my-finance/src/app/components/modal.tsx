'use client'

import clsx from 'clsx'

import { CloseIcon } from '@web-apps/ui'

type ModalProps = {
  show: boolean
  className?: string
  onClickOutside?: () => void
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = ({ show, className, onClickOutside, onClose, children }: ModalProps) => {
  if (!show) return null

  const closeButton = onClose ? (
    <button className="absolute right-3 top-3" aria-label="Close" onClick={onClose}>
      <CloseIcon hoverable />
    </button>
  ) : null

  return (
    <div className="absolute inset-0 bg-modal-overlay backdrop-blur-sm" onClick={onClickOutside}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'bg-modal-base',
          'inline-block',
          'relative',
          'top-1/4 md:top-1/3 left-1/2',
          '-translate-y-1/3 -translate-x-1/2',
          'max-md:min-w-[90vw] max-xl:min-w-[50vw] min-w-[35vw] max-w-[90vw]',
          'min-h-[400px] max-h-[90vh]',
          'rounded-md',
          'p-6',
          className,
        )}
      >
        {closeButton}
        {children}
      </div>
    </div>
  )
}
