import { ComponentPropsWithRef, ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { CloseIcon } from '../icons/close'

const Close = ({ className, ...rest }: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button className="absolute right-3 top-3" aria-label="Close" {...rest}>
      <CloseIcon className="hover:stroke-2" />
    </button>
  )
}

const Overlay = ({ className, ...rest }: ComponentPropsWithoutRef<'div'>) => {
  return <div className="absolute inset-0 bg-inverted/70 backdrop-blur-sm" {...rest} />
}

type ModalRef = HTMLDivElement
type ModalProps = ComponentPropsWithRef<'div'> & { onClose?: () => void }

const Body = forwardRef<ModalRef, ModalProps>(function Modal({ className, onClose, children, onClick, ...rest }, ref) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (onClick) onClick(e)
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={twMerge(
        'bg-base/80',
        'inline-block',
        'relative',
        'top-[150px] md:top-[250px] left-1/2',
        '-translate-x-1/2',
        'max-md:min-w-[90vw] max-xl:min-w-[50vw] min-w-[35vw] max-w-[90vw]',
        'min-h-[400px] max-h-[90vh]',
        'p-6',
        'rounded-md',
        'shadow-base shadow-2xl',
        className,
      )}
      {...rest}
    >
      {onClose ? <Close onClick={onClose} /> : null}
      {children}
    </div>
  )
})

export const Modal = { Overlay, Body }
