import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { CloseIcon } from '../icons/close'

const Close = ({ className, ...rest }: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button className="absolute right-3 top-3" aria-label="Close" {...rest}>
      <CloseIcon className="hover:stroke-2" />
    </button>
  )
}

type DrawerRef = HTMLDivElement
type DrawerProps = ComponentPropsWithoutRef<'div'> & { onClose?: () => void }

export const Drawer = forwardRef<DrawerRef, DrawerProps>(function Drawer({ className, onClose, children, ...rest }, ref) {
  return (
    <div className={twMerge('absolute inset-0 bg-inverted/70 backdrop-blur-sm pt-28 sm:pt-36 pb-6 px-6 sm:contents')}>
      <div
        ref={ref}
        className={twMerge(
          'relative',
          'max-sm:rounded-md max-sm:shadow-2xl',
          'max-h-full overflow-auto',
          'py-8 px-12',
          'bg-base',
          'shadow-base shadow-lg',
          className,
        )}
        {...rest}
      >
        {onClose ? <Close onClick={onClose} /> : null}
        {children}
      </div>
    </div>
  )
})
