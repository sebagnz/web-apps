'use client'

import clsx from 'clsx'

type ModalProps = {
  show: boolean
  onClickOutside?: () => void
  children: React.ReactNode
}

export const Modal = ({ show, onClickOutside, children }: ModalProps) => {
  if (!show) return null

  return (
    <div className="absolute inset-0 bg-slate-500/50" onClick={onClickOutside}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          'inline-block',
          'min-w-[30vw] max-w-[90vw]',
          'min-h-[400px] max-h-[90vh]',
          'relative',
          'top-1/2 left-1/2',
          '-translate-x-1/2 -translate-y-1/2',
          'rounded-md',
          'bg-white',
          'p-4',
        )}
      >
        {children}
      </div>
    </div>
  )
}
